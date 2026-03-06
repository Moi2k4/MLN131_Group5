import React, { useEffect, useRef } from 'react';
import './Section1.css';

const timelineEvents = [
    { year: '1945', title: 'Độc lập dân tộc', desc: 'Cách mạng tháng Tám thành công, khai sinh nước VNDCCH.' },
    { year: '1954', title: 'Giải phóng miền Bắc', desc: 'Hiệp định Genève – miền Bắc bắt đầu xây dựng CNXH.' },
    { year: '1973', title: 'Hiệp định Paris', desc: 'Tranh thủ sự ủng hộ quốc tế, giữ vững độc lập tự chủ.' },
    { year: '1975', title: 'Thống nhất đất nước', desc: 'Nền tảng CNXH miền Bắc đóng vai trò quyết định cho thắng lợi.' },
    { year: '1986', title: 'Đổi mới', desc: 'Chuyển sang kinh tế thị trường định hướng CNXH – bước ngoặt lịch sử.' },
];

export default function Section1() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const els = section.querySelectorAll('.reveal-card, .timeline-item, .section-header');
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    obs.unobserve(e.target);
                }
            }),
            { threshold: 0, rootMargin: '0px 0px -60px 0px' }
        );
        els.forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.07}s`;
            obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <section className="content-section" id="section1" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal-card">
                    <div className="s1-header-stripe" />
                    <span className="section-badge">Phần I</span>
                    <h2 className="section-title">Bản chất và Đặc điểm thời kỳ quá độ tại Việt Nam</h2>
                    <p className="section-intro">Sự phân tích sâu về tính tất yếu lịch sử và bản chất đan xen giữa cái cũ và cái mới.</p>
                </div>

                <div className="card-grid">
                    {/* Card A */}
                    <div className="topic-card reveal-card">
                        <div className="card-header-row">
                            <div className="card-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <span className="card-tag-badge">A</span>
                        </div>
                        <h3 className="card-title">Tính tất yếu và sự lựa chọn lịch sử</h3>
                        <div className="card-content">
                            {[
                                { label: 'Sự lựa chọn duy nhất đúng:', text: 'Con đường phản ánh đúng quy luật phát triển khách quan của cách mạng Việt Nam.' },
                                { label: 'Kế thừa có chọn lọc:', text: 'Bỏ qua xác lập vị trí thống trị của QHSX tư bản chủ nghĩa, nhưng kế thừa thành tựu văn minh KH-CN và quản lý.' },
                                { label: 'Minh chứng lịch sử:', text: 'Miền Bắc CNXH là hậu phương lớn — nền tảng vật chất, chính trị dẫn đến thắng lợi 1975.' },
                            ].map((p, i) => (
                                <div className="point-item" key={i}>
                                    <div className="point-dot" />
                                    <p><strong>{p.label}</strong> {p.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card B */}
                    <div className="topic-card reveal-card">
                        <div className="card-header-row">
                            <div className="card-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            </div>
                            <span className="card-tag-badge">B</span>
                        </div>
                        <h3 className="card-title">Đặc điểm xuất phát điểm — Tính chất đan xen</h3>
                        <div className="card-content">
                            {[
                                { label: 'Sự đan xen cũ – mới:', text: 'Đấu tranh giữa cái cũ (tàn dư phong kiến, thực dân, tâm lý sản xuất nhỏ) và cái mới (QHSX CNXH, công nghệ hiện đại).' },
                                { label: 'Kiên định mục tiêu:', text: 'Giữ vững độc lập dân tộc gắn liền với CNXH, không dao động trước bao vây, cấm vận hay áp lực quốc tế.' },
                            ].map((p, i) => (
                                <div className="point-item" key={i}>
                                    <div className="point-dot" />
                                    <p><strong>{p.label}</strong> {p.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="card-highlight">
                            <span>⚖️</span>
                            <p>Tính chất đan xen vừa là thách thức, vừa tạo ra động lực chuyển hóa từ thấp đến cao trong xây dựng CNXH.</p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="timeline-wrapper">
                    <h3 className="subsection-title reveal-card">Cột mốc lịch sử quan trọng</h3>
                    <div className="timeline">
                        {timelineEvents.map((ev, i) => (
                            <div className="timeline-item reveal-card" key={i}>
                                <div className="timeline-dot" />
                                <div className="timeline-content" data-ghost={ev.year}>
                                    <span className="timeline-year">{ev.year}</span>
                                    <h4>{ev.title}</h4>
                                    <p>{ev.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
