import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import Particles from './Particles';

const SUBTITLE = 'Đặc điểm nổi bật & con đường phát triển rút ngắn';

export default function Hero() {
    const statsRef = useRef([]);
    const heroRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const [typingDone, setTypingDone] = useState(false);

    // Typewriter effect for subtitle
    useEffect(() => {
        let i = 0;
        const delay = 900; // start after 0.9s
        const speed = 38;
        const t = setTimeout(() => {
            const interval = setInterval(() => {
                i++;
                setTypedText(SUBTITLE.slice(0, i));
                if (i >= SUBTITLE.length) {
                    clearInterval(interval);
                    setTypingDone(true);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(t);
    }, []);

    // Animated counters
    useEffect(() => {
        const observers = [];
        statsRef.current.forEach((el) => {
            if (!el) return;
            const target = +el.dataset.target;
            let started = false;
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    let count = 0;
                    const duration = 900;
                    const start = performance.now();
                    const tick = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3);
                        count = Math.round(ease * target);
                        el.textContent = count;
                        if (progress < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
            });
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    // Mouse parallax on glows
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const glows = hero.querySelectorAll('.hero-glow');
        const onMove = (e) => {
            const { clientX: x, clientY: y } = e;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;
            glows.forEach((g, i) => {
                const factor = (i + 1) * 18;
                g.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
            });
        };
        hero.addEventListener('mousemove', onMove);
        return () => hero.removeEventListener('mousemove', onMove);
    }, []);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="hero" id="hero" ref={heroRef}>
            <div className="hero-bg">
                <div className="hero-grid" />
                <div className="hero-glow glow-1" />
                <div className="hero-glow glow-2" />
                <div className="hero-glow glow-3" />
                <Particles />
            </div>

            <div className="container hero-content">
                <div className="hero-tag shimmer-badge fade-up" style={{ animationDelay: '0s' }}>
                    MLN131 &bull; Nhóm 5 &bull; Chủ đề thuyết trình
                </div>
                <h1 className="hero-title fade-up" style={{ animationDelay: '0.15s' }}>
                    Việt Nam trong<br />
                    <span className="gradient-text animated-gradient">thời kỳ quá độ</span>
                </h1>
                <p className="hero-subtitle fade-up typewriter-wrap" style={{ animationDelay: '0.3s' }}>
                    {typedText}
                    {!typingDone && <span className="cursor-blink">|</span>}
                </p>
                <p className="hero-desc fade-up" style={{ animationDelay: '0.45s' }}>
                    Phân tích những đặc điểm đan xen giữa cái cũ và cái mới trong thời kỳ quá độ lên chủ nghĩa xã hội tại Việt Nam, cùng những yếu tố then chốt để rút ngắn thời kỳ quá độ một cách bền vững.
                </p>
                <div className="hero-actions fade-up" style={{ animationDelay: '0.6s' }}>
                    <button className="btn btn-primary magnetic" onClick={() => scrollTo('section1')}>
                        <span className="btn-shine" />
                        Khám phá ngay
                    </button>
                    <button className="btn btn-outline" onClick={() => scrollTo('section3')}>Các mối quan hệ</button>
                </div>
                <div className="hero-stats fade-up" style={{ animationDelay: '0.75s' }}>
                    <div className="stat">
                        <span className="stat-num" data-target="3" ref={el => statsRef.current[0] = el}>0</span>
                        <span className="stat-label">Nội dung chính</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat">
                        <span className="stat-num" data-target="4" ref={el => statsRef.current[1] = el}>0</span>
                        <span className="stat-label">Yếu tố then chốt</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat">
                        <span className="stat-num" data-target="5" ref={el => statsRef.current[2] = el}>0</span>
                        <span className="stat-label">Mối quan hệ</span>
                    </div>
                </div>
            </div>

            <button className="scroll-hint" onClick={() => scrollTo('section1')}>
                <span>Cuộn xuống</span>
                <div className="scroll-arrow" />
            </button>
        </section>
    );
}
