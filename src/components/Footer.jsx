import React from 'react';
import './Footer.css';

export default function Footer() {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className="footer">
            {/* Wave divider */}
            <div className="footer-wave">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--bg)" />
                </svg>
            </div>

            <div className="footer-body">
                <div className="container">
                    <div className="footer-top">
                        <div className="footer-brand-block">
                            <div className="footer-badge-row">
                                <span className="brand-badge">MLN131</span>
                                <span className="footer-dot">⭐</span>
                            </div>
                            <p className="footer-brand-name">Nhóm 1 — Môn Chủ nghĩa Mác–Lênin</p>
                            <p className="footer-desc">
                                Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội:<br />
                                Đặc điểm và con đường phát triển rút ngắn.
                            </p>
                        </div>

                        <nav className="footer-nav">
                            <span className="footer-nav-title">Nội dung</span>
                            {[
                                { id: 'section1', label: 'I. Đặc điểm thời kỳ quá độ' },
                                { id: 'section2', label: 'II. Yếu tố then chốt' },
                                { id: 'section3', label: 'III. Mối quan hệ cần giải quyết' },
                                { id: 'strategy-game', label: 'IV. Trò chơi chiến lược' },
                                { id: 'ai-usage', label: 'V. Sử dụng AI' },
                            ].map(({ id, label }) => (
                                <button key={id} className="footer-link" onClick={() => scrollTo(id)}>
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2026 MLN131 – Nhóm 1. Trường Đại học FPT.</p>
                        <div className="footer-flag">🇻🇳</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
