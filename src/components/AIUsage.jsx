import React, { useEffect } from 'react';
import './AIUsage.css';

const aiTools = [
    {
        name: 'ChatGPT',
        icon: '💬',
        color: '#10b981',
        purposes: [
            'Gợi ý ý tưởng minigame tương tác',
            'Bổ sung và hoàn thiện nội dung',
            'Tư vấn cấu trúc bài học'
        ]
    },
    {
        name: 'Gemini',
        icon: '✨',
        color: '#6366f1',
        purposes: [
            'Gợi ý ý tưởng minigame sáng tạo',
            'Bổ sung thông tin chi tiết',
            'Phân tích và tổng hợp dữ liệu'
        ]
    },
    {
        name: 'Claude Sonnet',
        icon: '⚡',
        color: '#f59e0b',
        purposes: [
            'Hỗ trợ thiết kế animation',
            'Tư vấn layout và giao diện',
            'Tối ưu trải nghiệm người dùng'
        ]
    }
];

const verificationSteps = [
    {
        step: 1,
        title: 'Ghi nhận Thông tin AI',
        desc: 'Tiếp nhận các gợi ý và thông tin từ các công cụ AI như Claude Sonnet, ChatGPT, Gemini.',
        icon: '🤖'
    },
    {
        step: 2,
        title: 'Đối chiếu với Giáo trình',
        desc: 'So sánh thông tin nhận được với Giáo trình Tư tưởng Hồ Chí Minh chính thống.',
        icon: '📚'
    },
    {
        step: 3,
        title: 'Phân loại Nội dung',
        desc: 'Xếp loại nội dung thành: Chính xác, Chưa đủ căn cứ, hoặc Sai.',
        icon: '🔍'
    },
    {
        step: 4,
        title: 'Chốt Nội dung Cuối',
        desc: 'Nhóm chịu trách nhiệm phê duyệt và xác nhận nội dung cuối cùng.',
        icon: '✅'
    }
];

const commitments = [
    { icon: '🚫', text: 'Không lạm dụng AI' },
    { icon: '📖', text: 'Ưu tiên Nguồn Chính thống' },
    { icon: '🏷️', text: 'Đánh dấu Rõ ràng' },
    { icon: '🗑️', text: 'Loại bỏ Thông tin Không truy vết' },
    { icon: '✔️', text: 'Xác thực Chặt chẽ' }
];

export default function AIUsage() {
    useEffect(() => {
        const els = document.querySelectorAll('#ai-usage .reveal-item');
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => { 
                if (e.isIntersecting) { 
                    e.target.classList.add('revealed'); 
                } 
            }),
            { threshold: 0, rootMargin: '0px 0px -50px 0px' }
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <section className="content-section" id="ai-usage">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <span className="section-badge">Cam kết sử dụng AI</span>
                    <p className="section-intro">
                        Cam kết minh bạch trong việc sử dụng công nghệ AI và quy trình đảm bảo chất lượng nội dung
                    </p>
                </div>

                {/* AI Tools Usage */}
                <div className="ai-tools-section reveal-item">
                    <h3 className="subsection-title">
                        <span className="title-icon">🤖</span>
                        Công cụ AI được sử dụng
                    </h3>
                    <div className="ai-tools-grid">
                        {aiTools.map((tool, idx) => (
                            <div 
                                key={idx} 
                                className="ai-tool-card"
                                style={{'--tool-color': tool.color}}
                            >
                                <div className="tool-header">
                                    <span className="tool-icon">{tool.icon}</span>
                                    <h4 className="tool-name">{tool.name}</h4>
                                </div>
                                <ul className="tool-purposes">
                                    {tool.purposes.map((purpose, i) => (
                                        <li key={i}>
                                            <span className="purpose-bullet">→</span>
                                            {purpose}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Verification Process */}
                <div className="verification-section reveal-item">
                    <h3 className="subsection-title">
                        <span className="title-icon">🔄</span>
                        Quy trình Kiểm chứng
                    </h3>
                    <div className="verification-flow">
                        {verificationSteps.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <div className="verification-step">
                                    <div className="step-number">
                                        Bước {step.step}
                                    </div>
                                    <div className="step-icon">{step.icon}</div>
                                    <h4 className="step-title">{step.title}</h4>
                                    <p className="step-desc">{step.desc}</p>
                                </div>
                                {idx < verificationSteps.length - 1 && (
                                    <div className="flow-connector">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14m0 0l7-7m-7 7l-7-7"/>
                                        </svg>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Integrity Commitment */}
                <div className="commitment-section reveal-item">
                    <h3 className="subsection-title">
                        <span className="title-icon">🛡️</span>
                        Cam kết liêm chính
                    </h3>
                    <div className="commitment-card">
                        <p className="commitment-intro">
                            Chúng tôi cam kết sử dụng công nghệ AI một cách có trách nhiệm, minh bạch và liêm chính. 
                            AI là công cụ hỗ trợ, không thay thế con người. Mọi nội dung được cung cấp đều trải qua 
                            quá trình kiểm duyệt kỹ lưỡng và đối chiếu với các tài liệu chính gốc.
                        </p>
                        <div className="commitment-grid">
                            {commitments.map((item, idx) => (
                                <div key={idx} className="commitment-item">
                                    <span className="commitment-icon">{item.icon}</span>
                                    <span className="commitment-text">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

               
                
            </div>
        </section>
    );
}
