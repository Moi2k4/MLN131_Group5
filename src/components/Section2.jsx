import React, { useState, useEffect, useRef } from 'react';
import './Section2.css';

const factors = [
    {
        num: '01', icon: '🔬', color: '#f59e0b',
        title: 'Khoa học công nghệ & Kinh tế tri thức',
        progress: 90,
        points: [
            'Đẩy mạnh công nghiệp hóa, hiện đại hóa gắn với kinh tế tri thức.',
            'Cuộc CM KH-CN hiện đại là thời cơ và thách thức gay gắt.',
            'Ứng dụng chuyển đổi số và văn hóa số để bứt phá.',
        ],
    },
    {
        num: '02', icon: '🏛️', color: '#10b981',
        title: 'Thể chế kinh tế thị trường định hướng XHCN',
        progress: 78,
        points: [
            'Không sao chép máy móc mô hình tư bản chủ nghĩa thuần túy.',
            'Phát triển KTTT nhưng không rơi vào TBCN thuần túy.',
            'Giải quyết tốt quan hệ giữa Nhà nước, thị trường và xã hội.',
        ],
    },
    {
        num: '03', icon: '🌐', color: '#6366f1',
        title: 'Hội nhập quốc tế & Độc lập tự chủ',
        progress: 85,
        points: [
            'Chủ động hội nhập sâu rộng nhưng giữ vững bản sắc dân tộc.',
            'Tận dụng vốn, công nghệ và thị trường toàn cầu.',
            'Bài học Paris 1973: tranh thủ ủng hộ quốc tế, không lệ thuộc.',
        ],
    },
    {
        num: '04', icon: '🤝', color: '#ef4444',
        title: 'Phát huy sức mạnh con người & Đại đoàn kết',
        progress: 95,
        points: [
            'Kế thừa "Chiến tranh nhân dân": dân biết, dân bàn, dân làm, dân kiểm tra.',
            'Thực hiện dân chủ cơ sở, nhân dân làm chủ thực sự.',
            'Đầu tư giáo dục, nâng cao chất lượng nguồn nhân lực.',
        ],
    },
];

export default function Section2() {
    const [hovered, setHovered] = useState(null);
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
            { threshold: 0.15 }
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
                    <span className="section-badge">Phần II</span>
                    <h2 className="section-title">Các yếu tố then chốt để rút ngắn thời kỳ quá độ bền vững</h2>
                    <p className="section-intro">
                        "Rút ngắn" không phải là chủ quan duy ý chí mà là vận dụng sáng tạo các nguồn lực để tiến nhanh, tiến mạnh.
                    </p>
                </div>

                <div className="factors-grid">
                    {factors.map((f, i) => (
                        <div
                            className={`factor-card ${hovered === i ? 'hovered' : ''} ${revealed.includes(i) ? 'card-visible' : ''}`}
                            key={i}
                            data-idx={i}
                            style={{ '--accent': f.color, transitionDelay: `${i * 0.1}s` }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className="factor-num">{f.num}</div>
                            <div className="factor-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <ul className="factor-list">
                                {f.points.map((p, j) => <li key={j}>{p}</li>)}
                            </ul>
                            {/* Animated progress ring */}
                            <div className="factor-progress">
                                <svg viewBox="0 0 44 44" className="progress-ring">
                                    <circle cx="22" cy="22" r="18" className="ring-bg" />
                                    <circle
                                        cx="22" cy="22" r="18"
                                        className="ring-fill"
                                        style={{
                                            '--progress': revealed.includes(i) ? f.progress / 100 : 0,
                                            stroke: f.color,
                                        }}
                                    />
                                </svg>
                                <span className="progress-label" style={{ color: f.color }}>{f.progress}%</span>
                            </div>
                            <div className="factor-bar" />
                        </div>
                    ))}
                </div>

                <div className="diagram-wrapper reveal-card">
                    <h3 className="subsection-title">Mô hình phát triển rút ngắn</h3>
                    <div className="diagram">
                        <div className="diagram-core">
                            <span>Rút ngắn<br />thời kỳ quá độ</span>
                        </div>
                        {factors.map((f, i) => (
                            <div key={i} className={`diagram-item d-item-${i}`} style={{ '--color': f.color }}>
                                <div className="di-icon">{f.icon}</div>
                                <span>{f.num === '01' ? 'KH&CN' : f.num === '02' ? 'Thể chế' : f.num === '03' ? 'Hội nhập' : 'Con người'}</span>
                            </div>
                        ))}
                        <svg className="diagram-lines" viewBox="0 0 300 300">
                            {[0, 1, 2, 3].map(i => {
                                const angles = [225, 315, 135, 45];
                                const ang = (angles[i] * Math.PI) / 180;
                                const x2 = 150 + 100 * Math.cos(ang);
                                const y2 = 150 + 100 * Math.sin(ang);
                                return <line key={i} x1="150" y1="150" x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />;
                            })}
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
