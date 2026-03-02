import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
                <div className="container">
                    <div className="footer-inner">
                        <div className="footer-brand">
                            <span className="brand-badge">MLN131</span>
                            <p>Nhóm 1 — Chủ đề thuyết trình</p>
                        </div>
                        <p className="footer-topic">
                            Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội:<br />
                            Đặc điểm và con đường phát triển rút ngắn
                        </p>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 MLN131 – Nhóm 1. Môn học Chủ nghĩa Mác–Lênin.</p>
                    </div>
                </div>
        </footer>
    );
}
