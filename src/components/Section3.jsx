import React, { useState, useRef, useEffect } from 'react';
import './Section3.css';

const tags = ['Chủ nghĩa Mác–Lênin', 'Kinh tế thị trường XHCN', 'Đổi mới sáng tạo', 'Độc lập tự chủ', 'Hội nhập quốc tế'];

const relations = [
    {
        num: '01',
        title: 'Đổi mới — Ổn định — Phát triển',
        subtitle: '"Kiềng ba chân" cho sự tồn tại của chế độ',
        type: 'tripod',
        legs: [
            { icon: '🔄', color: '#6366f1', title: 'Đổi mới', role: 'Là động lực', desc: 'Linh hoạt thay đổi chiến lược, phương pháp để vượt qua thách thức của thời đại.' },
            { icon: '🛡️', color: '#10b981', title: 'Ổn định', role: 'Là tiền đề', desc: 'Điều kiện tiên quyết để thực hiện đổi mới và phát triển bền vững.' },
            { icon: '📈', color: '#f59e0b', title: 'Phát triển', role: 'Là mục tiêu', desc: 'Cơ sở để giữ vững ổn định và tạo nền tảng cho đổi mới tiếp theo.' },
        ],
        lesson: { icon: '📚', text: 'Trong chiến tranh, linh hoạt thay đổi chiến lược (đổi mới) nhưng giữ vững mục tiêu độc lập (ổn định) để đi đến thắng lợi (phát triển).' },
    },
    {
        num: '02',
        title: 'Kinh tế thị trường — Định hướng XHCN',
        subtitle: 'Mối quan hệ đặc thù nhất của Việt Nam',
        type: 'dual',
        cols: [
            { icon: '⚙️', color: '#f59e0b', title: 'Kinh tế thị trường', desc: 'Là phương thức để giải phóng lực lượng sản xuất, kích thích tăng trưởng thông qua quy luật giá trị và cạnh tranh.' },
            { icon: '🎯', color: '#ef4444', title: 'Định hướng XHCN', desc: 'Đảm bảo kinh tế phát triển vì con người, không để phân hóa giàu nghèo quá mức, giữ vững vai trò chủ đạo của kinh tế nhà nước.' },
        ],
        principle: 'Không đồng nhất kinh tế thị trường với chủ nghĩa tư bản. Sử dụng "công cụ" thị trường để xây dựng "mục tiêu" xã hội chủ nghĩa.',
    },
    {
        num: '03',
        title: 'Tăng trưởng kinh tế — Phát triển văn hóa & Công bằng xã hội',
        subtitle: 'Giải quyết câu hỏi "Phát triển để làm gì?"',
        type: 'tripod',
        legs: [
            { icon: '💰', color: '#10b981', title: 'Tăng trưởng kinh tế', role: 'Tạo nguồn lực', desc: 'Cung cấp nguồn lực vật chất cho sự phát triển toàn diện.' },
            { icon: '⚖️', color: '#6366f1', title: 'Công bằng xã hội', role: 'Trong từng bước', desc: 'Thực hiện trong từng bước phát triển, không đợi kinh tế giàu mới làm công bằng.' },
            { icon: '🎭', color: '#f59e0b', title: 'Phát triển văn hóa', role: '"Hệ điều hành"', desc: 'Là nền tảng tinh thần, định hướng giá trị và mục tiêu của xã hội.' },
        ],
        lesson: { icon: '💡', text: 'Mục tiêu cuối cùng của CNXH là vì sự phát triển toàn diện của con người — không chỉ về vật chất.' },
    },
    {
        num: '04',
        title: 'Độc lập tự chủ — Hội nhập quốc tế',
        subtitle: 'Vận dụng sáng tạo bài học kháng chiến chống Mỹ',
        type: 'dual',
        cols: [
            { icon: '🏳️', color: '#6366f1', title: 'Độc lập, tự chủ', desc: 'Giữ vững quyền tự quyết về chính trị, kinh tế và con đường phát triển của dân tộc Việt Nam.' },
            { icon: '🌏', color: '#10b981', title: 'Hội nhập quốc tế', desc: 'Tận dụng vốn, công nghệ và thị trường toàn cầu để "rút ngắn" thời gian phát triển.' },
        ],
        principle: 'Như trong kháng chiến, sẵn sàng nhận viện trợ và hợp tác quốc tế nhưng tuyệt đối không để bị phụ thuộc hay chi phối.',
    },
    {
        num: '05',
        title: 'Đảng lãnh đạo — Nhà nước quản lý — Nhân dân làm chủ',
        subtitle: 'Cơ chế vận hành tổng quát của hệ thống chính trị Việt Nam',
        type: 'tripod',
        legs: [
            { icon: '⭐', color: '#ef4444', title: 'Đảng lãnh đạo', role: 'Đường lối chiến lược', desc: 'Đề ra đường lối, phương hướng chiến lược phát triển đất nước.' },
            { icon: '🏛️', color: '#6366f1', title: 'Nhà nước quản lý', role: 'Thực thi pháp luật', desc: 'Cụ thể hóa đường lối thành pháp luật và điều hành toàn bộ xã hội.' },
            { icon: '👥', color: '#10b981', title: 'Nhân dân làm chủ', role: 'Chủ thể quyền lực', desc: 'Là chủ thể của quyền lực, tham gia giám sát và thụ hưởng thành quả phát triển.' },
        ],
        lesson: { icon: '🏆', text: 'Nguyên tắc đúc rút từ "Chiến tranh nhân dân", nơi nhân dân là gốc rễ của mọi thắng lợi lịch sử.' },
    },
];

function AnimatedAccordionBody({ isOpen, children }) {
    const innerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!innerRef.current) return;
        if (isOpen) {
            setHeight(innerRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div
            className="accordion-outer"
            style={{ height, overflow: 'hidden', transition: 'height 0.42s cubic-bezier(0.22,1,0.36,1)' }}
        >
            <div ref={innerRef} className="relation-body">
                {children}
            </div>
        </div>
    );
}

function TripodBody({ r }) {
    return (
        <>
            <div className="rel-tripod">
                {r.legs.map((leg, i) => (
                    <div className="tripod-leg" key={i} style={{ '--c': leg.color }}>
                        <div className="tl-icon">{leg.icon}</div>
                        <h4>{leg.title}</h4>
                        <span className="tl-role">{leg.role}</span>
                        <p>{leg.desc}</p>
                    </div>
                ))}
            </div>
            {r.lesson && (
                <div className="rel-lesson">
                    <span>{r.lesson.icon}</span>
                    <p>{r.lesson.text}</p>
                </div>
            )}
        </>
    );
}

function DualBody({ r }) {
    return (
        <>
            <div className="rel-dual">
                {r.cols.map((col, i) => (
                    <div className="rel-col" key={i} style={{ '--c': col.color }}>
                        <h4>{col.icon} {col.title}</h4>
                        <p>{col.desc}</p>
                    </div>
                ))}
            </div>
            <div className="rel-principle"><strong>Nguyên tắc cốt lõi:</strong> {r.principle}</div>
        </>
    );
}

export default function Section3() {
    const [open, setOpen] = useState(null);
    const toggle = (i) => setOpen(open === i ? null : i);
    const sectionRef = useRef(null);
    const [revealedItems, setRevealedItems] = useState(new Set());
    const [headerRevealed, setHeaderRevealed] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Observe the section header separately
        const header = section.querySelector('.section-header');
        if (header) {
            const hObs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setHeaderRevealed(true);
                        hObs.disconnect();
                    }
                },
                { threshold: 0, rootMargin: '0px 0px -50px 0px' }
            );
            hObs.observe(header);
        }

        // Observe each relation item by index
        const items = section.querySelectorAll('.relation-item');
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    const idx = +e.target.dataset.idx;
                    setRevealedItems(prev => new Set([...prev, idx]));
                    obs.unobserve(e.target);
                }
            }),
            { threshold: 0, rootMargin: '0px 0px -50px 0px' }
        );
        items.forEach((el, i) => {
            el.dataset.idx = i;
            el.style.transitionDelay = `${i * 0.07}s`;
            obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <section className="content-section" id="section3" ref={sectionRef}>
            <div className="container">
                <div className={`section-header reveal-card ${headerRevealed ? 'revealed' : ''}`}>
                    <div className="s1-header-stripe" />
                    <span className="section-badge">Phần III</span>
                    <h2 className="section-title">Những mối quan hệ cần phải giải quyết</h2>
                    <p className="section-intro">Năm mối quan hệ nền tảng cho sự vận hành của hệ thống chính trị và kinh tế Việt Nam.</p>
                </div>

                <div className="relations-list">
                    {relations.map((r, i) => (
                        <div
                            className={`relation-item reveal-card ${revealedItems.has(i) ? 'revealed' : ''} ${open === i ? 'open' : ''}`}
                            key={i}
                        >
                            <button className="relation-header" onClick={() => toggle(i)}>
                                <div className="rel-num">{r.num}</div>
                                <div className="rel-title-wrap">
                                    <h3 className="rel-title">{r.title}</h3>
                                    <p className="rel-subtitle">{r.subtitle}</p>
                                </div>
                                <div className="rel-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </button>
                            <AnimatedAccordionBody isOpen={open === i}>
                                {r.type === 'tripod' ? <TripodBody r={r} /> : <DualBody r={r} />}
                            </AnimatedAccordionBody>
                        </div>
                    ))}
                </div>
                {/* Conclusion */}
                <div className="conclusion-card">
                    <div className="conclusion-flag">🇻🇳</div>
                    <h2>Kết luận</h2>
                    <p>
                        Thời kỳ quá độ tại Việt Nam là một giai đoạn lịch sử đặc biệt, đòi hỏi sự kết hợp hài hòa giữa kiên định mục tiêu XHCN và linh hoạt sáng tạo trong phương pháp thực hiện. Bằng cách vận dụng sáng tạo chủ nghĩa Mác–Lênin vào điều kiện cụ thể của Việt Nam, chúng ta có thể rút ngắn thời kỳ quá độ, tiến lên chủ nghĩa xã hội một cách bền vững và thịnh vượng.
                    </p>
                    <div className="conclusion-tags">
                        {tags.map((t, i) => <span className="ctag" key={i}>{t}</span>)}
                    </div>
                </div>            </div>
        </section>
    );
}
