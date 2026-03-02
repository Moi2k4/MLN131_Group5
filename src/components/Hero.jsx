import React, { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
    const statsRef = useRef([]);

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
                    const step = Math.ceil(target / 40);
                    const timer = setInterval(() => {
                        count = Math.min(count + step, target);
                        el.textContent = count;
                        if (count >= target) clearInterval(timer);
                    }, 30);
                }
            });
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="hero" id="hero">
            <div className="hero-bg">
                <div className="hero-grid" />
                <div className="hero-glow glow-1" />
                <div className="hero-glow glow-2" />
                <div className="hero-glow glow-3" />
            </div>

            <div className="container hero-content">
                <div className="hero-tag fade-up">MLN131 &bull; Nhóm 1 &bull; Chủ đề thuyết trình</div>
                <h1 className="hero-title fade-up">
                    Việt Nam trong<br />
                    <span className="gradient-text">thời kỳ quá độ</span>
                </h1>
                <p className="hero-subtitle fade-up">
                    Đặc điểm nổi bật &amp; con đường phát triển rút ngắn
                </p>
                <p className="hero-desc fade-up">
                    Phân tích những đặc điểm đan xen giữa cái cũ và cái mới trong thời kỳ quá độ lên chủ nghĩa xã hội tại Việt Nam, cùng những yếu tố then chốt để rút ngắn thời kỳ quá độ một cách bền vững.
                </p>
                <div className="hero-actions fade-up">
                    <button className="btn btn-primary" onClick={() => scrollTo('section1')}>Khám phá ngay</button>
                    <button className="btn btn-outline" onClick={() => scrollTo('section3')}>Các mối quan hệ</button>
                </div>
                <div className="hero-stats fade-up">
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
