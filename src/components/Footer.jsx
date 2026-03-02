import React from 'react';
import './Footer.css';

const tags = ['Chủ nghĩa Mác–Lênin', 'Kinh tế thị trường XHCN', 'Đổi mới sáng tạo', 'Độc lập tự chủ', 'Hội nhập quốc tế'];

export default function Footer() {
    return (
        <>
            {/* Conclusion */}
            <section className="conclusion-section">
                <div className="container">
                    <div className="conclusion-card">
                        <div className="conclusion-flag">🇻🇳</div>
                        <h2>Kết luận</h2>
                        <p>
                            Thời kỳ quá độ tại Việt Nam là một giai đoạn lịch sử đặc biệt, đòi hỏi sự kết hợp hài hòa giữa kiên định mục tiêu XHCN và linh hoạt sáng tạo trong phương pháp thực hiện. Bằng cách vận dụng sáng tạo chủ nghĩa Mác–Lênin vào điều kiện cụ thể của Việt Nam, chúng ta có thể rút ngắn thời kỳ quá độ, tiến lên chủ nghĩa xã hội một cách bền vững và thịnh vượng.
                        </p>
                        <div className="conclusion-tags">
                            {tags.map((t, i) => <span className="ctag" key={i}>{t}</span>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
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
        </>
    );
}
