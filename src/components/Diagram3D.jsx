import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ── per-factor orbit config ─────────────────────────────────────────────────
const NODES = [
    { label: 'KH&CN', icon: '🔬', color: '#f59e0b', angle: 0, radius: 2.8, y: 0.4 },
    { label: 'Thể chế', icon: '🏛️', color: '#10b981', angle: 90, radius: 2.8, y: -0.4 },
    { label: 'Hội nhập', icon: '🌐', color: '#6366f1', angle: 180, radius: 2.8, y: 0.4 },
    { label: 'Con người', icon: '🤝', color: '#ef4444', angle: 270, radius: 2.8, y: -0.4 },
];

// ── orbit ring (dashed ellipse drawn with <Line>) ────────────────────────────
function OrbitRing() {
    const points = [];
    for (let i = 0; i <= 64; i++) {
        const t = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(t) * 2.8, 0, Math.sin(t) * 2.8));
    }
    return (
        <Line
            points={points}
            color="rgba(255,255,255,0.12)"
            lineWidth={1}
            dashed
            dashSize={0.18}
            gapSize={0.12}
        />
    );
}

// ── connection lines from center to each node ────────────────────────────────
function ConnectLine({ position, color }) {
    const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...position)];
    return (
        <Line
            points={points}
            color={color}
            lineWidth={0.8}
            transparent
            opacity={0.25}
            dashed
            dashSize={0.15}
            gapSize={0.1}
        />
    );
}

// ── sat node: glowing sphere + HTML label ───────────────────────────────────
function SatNode({ node, groupAngle }) {
    const meshRef = useRef();
    const rad = ((node.angle + groupAngle) * Math.PI) / 180;
    const x = Math.cos(rad) * node.radius;
    const z = Math.sin(rad) * node.radius;
    const pos = [x, node.y, z];

    // gentle bob
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.position.y = node.y + Math.sin(clock.elapsedTime * 0.8 + node.angle) * 0.12;
        }
    });

    const hex = new THREE.Color(node.color);

    return (
        <group position={pos}>
            {/* Outer glow sphere */}
            <Sphere ref={meshRef} args={[0.46, 32, 32]}>
                <meshStandardMaterial
                    color={node.color}
                    emissive={hex}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.18}
                />
            </Sphere>

            {/* Core sphere */}
            <Sphere args={[0.32, 32, 32]}>
                <meshStandardMaterial
                    color={node.color}
                    emissive={hex}
                    emissiveIntensity={0.8}
                    metalness={0.3}
                    roughness={0.4}
                />
            </Sphere>

            {/* HTML label — always faces camera */}
            <Html
                center
                distanceFactor={6}
                style={{ pointerEvents: 'none', userSelect: 'none', textAlign: 'center' }}
            >
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    transform: 'translateY(32px)',
                }}>
                    <span style={{ fontSize: 22 }}>{node.icon}</span>
                    <span style={{
                        fontSize: 11, fontWeight: 700, color: node.color,
                        whiteSpace: 'nowrap', letterSpacing: 0.5,
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        textShadow: '0 1px 8px rgba(0,0,0,0.9)',
                    }}>{node.label}</span>
                </div>
            </Html>

            <ConnectLine position={[-x, -node.y, -z]} color={node.color} />
        </group>
    );
}

// ── center sphere ─────────────────────────────────────────────────────────────
function CoreSphere() {
    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.elapsedTime * 0.25;
            ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.1;
        }
    });

    return (
        <group ref={ref}>
            {/* Outer atmosphere glow */}
            <Sphere args={[1.05, 48, 48]}>
                <meshStandardMaterial
                    color="#c8a84b"
                    emissive="#c8a84b"
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.08}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Main gold sphere */}
            <Sphere args={[0.88, 48, 48]}>
                <meshStandardMaterial
                    color="#1a1200"
                    emissive="#c8a84b"
                    emissiveIntensity={0.35}
                    metalness={0.7}
                    roughness={0.25}
                    envMapIntensity={1}
                />
            </Sphere>

            {/* Red accent ring */}
            <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                <torusGeometry args={[1.0, 0.025, 16, 80]} />
                <meshStandardMaterial color="#d32f2f" emissive="#d32f2f" emissiveIntensity={1} />
            </mesh>

            {/* HTML label on core */}
            <Html center distanceFactor={6} style={{ pointerEvents: 'none', userSelect: 'none', textAlign: 'center' }}>
                <div style={{
                    color: '#c8a84b', fontSize: 11, fontWeight: 700, lineHeight: 1.4,
                    whiteSpace: 'nowrap', fontFamily: "'Be Vietnam Pro', sans-serif",
                    textShadow: '0 1px 8px rgba(0,0,0,0.9)',
                }}>
                    Rút ngắn<br />thời kỳ quá độ
                </div>
            </Html>
        </group>
    );
}

// ── auto-rotate group (nodes orbit around center) ─────────────────────────────
function OrbitGroup() {
    const groupRef = useRef();
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.elapsedTime * 0.22;
        }
    });

    return (
        <group ref={groupRef}>
            <OrbitRing />
            {NODES.map((n, i) => (
                <SatNode key={i} node={n} groupAngle={0} />
            ))}
        </group>
    );
}

// ── point / spot lights ───────────────────────────────────────────────────────
function Lights() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[4, 4, 4]} intensity={1.2} color="#c8a84b" />
            <pointLight position={[-4, -3, -4]} intensity={0.8} color="#d32f2f" />
            <pointLight position={[0, 5, 0]} intensity={0.6} color="#ffffff" />
        </>
    );
}

// ── exported component ────────────────────────────────────────────────────────
export default function Diagram3D() {
    return (
        <div style={{ width: '100%', height: 580, cursor: 'grab', borderRadius: 16, overflow: 'hidden' }}>
            <Canvas
                camera={{ position: [0, 2.5, 6.2], fov: 46 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Lights />
                    <CoreSphere />
                    <OrbitGroup />
                    <OrbitControls
                        enableZoom
                        enablePan={false}
                        minDistance={4}
                        maxDistance={12}
                        autoRotate={false}
                        dampingFactor={0.07}
                        enableDamping
                    />
                </Suspense>
            </Canvas>
            <p style={{
                textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.25)',
                letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 8,
                fontFamily: "'Be Vietnam Pro', sans-serif",
            }}>
                Kéo để xoay • Cuộn để zoom
            </p>
        </div>
    );
}
