import React, { useState, useEffect, useRef } from 'react';
import './Section2.css';
import Diagram3D from './Diagram3D';

const factors = [
    {
        num: '01', icon: '🔬', color: '#f59e0b',
        title: 'Khoa học công nghệ & Kinh tế tri thức',
        label: 'KH-CN',
        points: [
            'Đẩy mạnh công nghiệp hóa, hiện đại hóa gắn với kinh tế tri thức.',
            'Cuộc CM KH-CN hiện đại là thời cơ và thách thức gay gắt.',
            'Ứng dụng chuyển đổi số và văn hóa số để bứt phá.',
        ],
    },
    {
        num: '02', icon: '🏛️', color: '#10b981',
        title: 'Thể chế kinh tế thị trường định hướng CNXH',
        label: 'Thể chế',
        points: [
            'Không sao chép máy móc mô hình tư bản chủ nghĩa thuần túy.',
            'Phát triển KTTT nhưng không rơi vào TBCN thuần túy.',
            'Giải quyết tốt quan hệ giữa Nhà nước, thị trường và xã hội.',
        ],
    },
    {
        num: '03', icon: '🌐', color: '#6366f1',
        title: 'Hội nhập quốc tế & Độc lập tự chủ',
        label: 'Hội nhập',
        points: [
            'Chủ động hội nhập sâu rộng nhưng giữ vững bản sắc dân tộc.',
            'Tận dụng vốn, công nghệ và thị trường toàn cầu.',
            'Bài học Paris 1973: tranh thủ ủng hộ quốc tế, không lệ thuộc.',
        ],
    },
    {
        num: '04', icon: '🤝', color: '#ef4444',
        title: 'Phát huy sức mạnh con người & Đại đoàn kết',
        label: 'Con người',
        points: [
            'Kế thừa "Chiến tranh nhân dân": dân biết, dân bàn, dân làm, dân kiểm tra.',
            'Thực hiện dân chủ cơ sở, nhân dân làm chủ thực sự.',
            'Đầu tư giáo dục, nâng cao chất lượng nguồn nhân lực.',
        ],
    },
];

// ─── 3D Orbit Diagram ───────────────────────────────────────────────────────
const TILT = 58;   // degrees — how tilted the orbit plane is
const R = 120;  // orbit radius in px
const tiltSin = Math.sin((TILT * Math.PI) / 180);
const tiltCos = Math.cos((TILT * Math.PI) / 180);

function OrbitDiagram() {
    const nodesRef = useRef([]);
    const rafRef = useRef(null);
    const angleRef = useRef(0);

    useEffect(() => {
        const tick = () => {
            angleRef.current = (angleRef.current + 0.35) % 360;
            const a = angleRef.current;

            nodesRef.current.forEach((node, i) => {
                if (!node) return;
                const theta = ((i * 90 + a) * Math.PI) / 180;

                // Project circle in XZ plane tilted on X axis
                const x = R * Math.cos(theta);
                const y = -R * Math.sin(theta) * tiltSin;   // screen Y
                const depth = R * Math.sin(theta) * tiltCos;    // depth

                // Perspective-ish scale: far = smaller, near = larger
                const t = (depth / R + 1) / 2;              // 0‥1
                const scale = 0.62 + 0.5 * t;
                const alpha = 0.45 + 0.55 * t;

                node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
                node.style.opacity = alpha;
                node.style.zIndex = Math.round(depth + 100);
            });

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <div className="orbit-diagram">
            {/* Ellipse track — visual only */}
            <svg className="orbit-track-svg" viewBox="0 0 340 340">
                <ellipse
                    cx="170" cy="170"
                    rx={R} ry={R * tiltCos}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1.5"
                    strokeDasharray="6 5"
                />
            </svg>

            {/* Center core */}
            <div className="orbit-core">
                <div className="orbit-core-ring" />
                <span>Rút ngắn<br />thời kỳ quá độ</span>
            </div>

            {/* Orbiting nodes — positioned by JS */}
            {factors.map((f, i) => (
                <div
                    key={i}
                    className="orbit-node"
                    ref={el => nodesRef.current[i] = el}
                    style={{ '--c': f.color }}
                >
                    <div className="orbit-node-icon">{f.icon}</div>
                    <span className="orbit-node-label">{f.label}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Section2() {
    const [revealed, setRevealed] = useState([]);
    const sectionRef = useRef(null);


    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const cards = section.querySelectorAll('.factor-card');
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    setRevealed(prev => [...prev, +e.target.dataset.idx]);
                    obs.unobserve(e.target);
                }
            }),
            { threshold: 0.1 }
        );
        cards.forEach(c => obs.observe(c));

        const headings = section.querySelectorAll('.section-header, .diagram-wrapper');
        const hObs = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('revealed'); hObs.unobserve(e.target); }
            }),
            { threshold: 0, rootMargin: '0px 0px -40px 0px' }
        );
        headings.forEach(h => hObs.observe(h));

        return () => { obs.disconnect(); hObs.disconnect(); };
    }, []);

    return (
        <section className="content-section section-alt" id="section2" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal-card">
                    <div className="s1-header-stripe" />
                    <span className="section-badge">Phần II</span>
                    <h2 className="section-title">Các yếu tố then chốt để rút ngắn thời kỳ quá độ bền vững</h2>
                    <p className="section-intro">
                        "Rút ngắn" không phải là chủ quan duy ý chí mà là vận dụng sáng tạo các nguồn lực để tiến nhanh, tiến mạnh.
                    </p>
                </div>

                <div className="factors-grid">
                    {factors.map((f, i) => (
                        <div
                            className={`factor-card ${revealed.includes(i) ? 'card-visible' : ''}`}
                            key={i}
                            data-idx={i}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            {/* Left colored strip */}
                            <div
                                className="factor-left"
                                data-num={f.num}
                                style={{ background: `linear-gradient(160deg, ${f.color}22, ${f.color}08)`, borderRight: `3px solid ${f.color}` }}
                            >
                                <div className="factor-icon-wrap">{f.icon}</div>
                                <div className="factor-num-label">#{f.num}</div>
                            </div>

                            {/* Main body */}
                            <div className="factor-body">
                                <h3>{f.title}</h3>
                                <ul className="factor-list">
                                    {f.points.map((p, j) => <li key={j}>{p}</li>)}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="diagram-wrapper reveal-card">
                    <h3 className="subsection-title">Mô hình phát triển rút ngắn</h3>
                    <Diagram3D />
                </div>
            </div>
        </section>
    );
}
