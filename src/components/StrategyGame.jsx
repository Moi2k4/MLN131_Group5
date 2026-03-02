import React, { useState } from 'react';
import './StrategyGame.css';

export default function StrategyGame() {
  const [stats, setStats] = useState({
    economy: 50,
    socialJustice: 50,
    environment: 50,
    publicSupport: 50
  });
  
  const [currentScenario, setCurrentScenario] = useState(0);
  const [gamePhase, setGamePhase] = useState('playing'); // 'playing', 'result'
  const [showEffect, setShowEffect] = useState(null);

  const scenarios = [
  // --- 5 Câu đầu (Tối ưu lại logic) ---
  {
    id: 1,
    title: 'Tính chất đan xen cũ-mới',
    question: 'Nền kinh tế đang chuyển đổi từ kế hoạch hóa tập trung sang thị trường định hướng XHCN. Các doanh nghiệp nhà nước (DNNN) đang kém hiệu quả nhưng nắm giữ nguồn lực lớn. Bạn xử lý thế nào?',
    options: [
      { text: 'Duy trì độc quyền DNNN để đảm bảo định hướng', effects: { economy: -15, socialJustice: +5, environment: 0, publicSupport: -10 } },
      { text: 'Cổ phần hóa mạnh mẽ, tạo sân chơi bình đẳng cho tư nhân', effects: { economy: +20, socialJustice: +5, environment: 0, publicSupport: +15 } },
      { text: 'Tư nhân hóa hoàn toàn các lĩnh vực then chốt', effects: { economy: +15, socialJustice: -25, environment: -10, publicSupport: -5 } }
    ]
  },
  {
    id: 2,
    title: 'Con đường rút ngắn - Công nghiệp hóa',
    question: 'Để "đi tắt đón đầu", bạn cần quyết định về tiêu chuẩn công nghệ cho các khu công nghiệp mới.',
    options: [
      { text: 'Hạ thấp tiêu chuẩn môi trường để thu hút vốn FDI nhanh', effects: { economy: +25, socialJustice: 0, environment: -30, publicSupport: -5 } },
      { text: 'Chỉ nhận dự án công nghệ cao, phát thải thấp dù vốn vào chậm', effects: { economy: -10, socialJustice: +10, environment: +25, publicSupport: +10 } },
      { text: 'Xây dựng lộ trình chuyển đổi xanh theo từng giai đoạn', effects: { economy: +15, socialJustice: +10, environment: +5, publicSupport: +15 } }
    ]
  },
  {
    id: 3,
    title: '9 mối quan hệ lớn - Tăng trưởng & Văn hóa',
    question: 'Một dự án thủy điện lớn hứa hẹn an ninh năng lượng nhưng yêu cầu di dời các bản làng dân tộc thiểu số lâu đời.',
    options: [
      { text: 'Ưu tiên thủy điện, di dời dân cư đến khu tái định cư mới', effects: { economy: +20, socialJustice: -15, environment: -10, publicSupport: -10 } },
      { text: 'Hủy dự án thủy điện để bảo tồn không gian văn hóa', effects: { economy: -15, socialJustice: +10, environment: +15, publicSupport: +10 } },
      { text: 'Thiết kế lại quy mô nhỏ hơn, kết hợp du lịch sinh thái cộng đồng', effects: { economy: +5, socialJustice: +15, environment: +10, publicSupport: +20 } }
    ]
  },
  {
    id: 4,
    title: 'Hội nhập quốc tế - Độc lập tự chủ',
    question: 'Thế giới đang khủng hoảng chuỗi cung ứng. Một cường quốc đề nghị hỗ trợ tài chính kèm theo các cam kết về chính sách khai thác tài nguyên.',
    options: [
      { text: 'Chấp nhận viện trợ để giải quyết khó khăn kinh tế trước mắt', effects: { economy: +20, socialJustice: -5, environment: -15, publicSupport: -10 } },
      { text: 'Từ chối viện trợ, thắt lưng buộc bụng để giữ tự chủ', effects: { economy: -15, socialJustice: -10, environment: +5, publicSupport: +5 } },
      { text: 'Đa phương hóa quan hệ, vay vốn từ nhiều định chế quốc tế', effects: { economy: +10, socialJustice: +5, environment: 0, publicSupport: +15 } }
    ]
  },
  {
    id: 5,
    title: 'Con người - Nguồn lực phát triển',
    question: 'Tình trạng "chảy máu chất xám" đang diễn ra khi nhân tài ra nước ngoài làm việc sau khi được đào tạo.',
    options: [
      { text: 'Áp dụng chế độ cam kết bắt buộc làm việc trong nước', effects: { economy: +5, socialJustice: -5, environment: 0, publicSupport: -20 } },
      { text: 'Xây dựng các đặc khu khoa học với lương bổng vượt định mức', effects: { economy: +15, socialJustice: -10, environment: 0, publicSupport: +10 } },
      { text: 'Cải thiện môi trường học thuật và tự do sáng tạo lâu dài', effects: { economy: +10, socialJustice: +10, environment: 0, publicSupport: +20 } }
    ]
  },

  // --- 5 Câu mới tăng độ khó (Advanced) ---
  {
    id: 6,
    title: 'Chuyển đổi số - Hạ tầng hiện đại',
    question: 'Bạn muốn số hóa toàn bộ quản lý hành chính để giảm tham nhũng, nhưng chi phí rất lớn và một bộ phận công chức lớn tuổi khó thích nghi.',
    options: [
      { text: 'Thực hiện quyết liệt, cắt giảm nhân sự không đáp ứng công nghệ', effects: { economy: +20, socialJustice: -15, environment: +5, publicSupport: -10 } },
      { text: 'Làm thí điểm ở vài thành phố lớn trước khi nhân rộng', effects: { economy: +10, socialJustice: +5, environment: 0, publicSupport: +10 } },
      { text: 'Đào tạo lại toàn bộ đội ngũ, chấp nhận tiến độ số hóa chậm', effects: { economy: +5, socialJustice: +15, environment: 0, publicSupport: +15 } }
    ]
  },
  {
    id: 7,
    title: 'Phân hóa giàu nghèo - Công bằng xã hội',
    question: 'Kinh tế thị trường khiến khoảng cách giàu nghèo ở đô thị và nông thôn ngày càng xa. Bạn sẽ điều tiết thuế thế nào?',
    options: [
      { text: 'Đánh thuế cao vào bất động sản thứ hai và hàng xa xỉ', effects: { economy: -10, socialJustice: +25, environment: 0, publicSupport: +15 } },
      { text: 'Giữ thuế thấp để khuyến khích các tỷ phú tái đầu tư vào sản xuất', effects: { economy: +20, socialJustice: -20, environment: -5, publicSupport: -10 } },
      { text: 'Dùng ngân sách hỗ trợ trực tiếp tín dụng cho hộ nghèo', effects: { economy: +5, socialJustice: +20, environment: 0, publicSupport: +15 } }
    ]
  },
  {
    id: 8,
    title: 'An ninh năng lượng - Biến đổi khí hậu',
    question: 'Hạn hán kéo dài khiến các hồ thủy điện cạn nước. Nguy cơ thiếu điện cho sản xuất rất cao. Giải pháp của bạn?',
    options: [
      { text: 'Tăng cường chạy điện than hết công suất để cứu sản xuất', effects: { economy: +15, socialJustice: 0, environment: -30, publicSupport: +5 } },
      { text: 'Cắt điện luân phiên ở khu dân cư, ưu tiên cho các nhà máy', effects: { economy: +10, socialJustice: -20, environment: 0, publicSupport: -25 } },
      { text: 'Nhập khẩu điện khẩn cấp và kêu gọi tiết kiệm điện toàn dân', effects: { economy: -5, socialJustice: +5, environment: +5, publicSupport: +10 } }
    ]
  },
  {
    id: 9,
    title: 'Quản lý đất đai - Tính chất đan xen',
    question: 'Giá đất tăng phi mã khiến người dân khó mua nhà, nhưng đất đai lại là nguồn thu ngân sách chính của địa phương.',
    options: [
      { text: 'Siết chặt tín dụng bất động sản để hạ giá nhà', effects: { economy: -20, socialJustice: +20, environment: +5, publicSupport: +10 } },
      { text: 'Tiếp tục đấu giá đất để lấy kinh phí xây dựng hạ tầng', effects: { economy: +20, socialJustice: -15, environment: -10, publicSupport: -5 } },
      { text: 'Phát triển mạnh nhà ở xã hội và đánh thuế đầu cơ', effects: { economy: +5, socialJustice: +25, environment: 0, publicSupport: +20 } }
    ]
  },
  {
    id: 10,
    title: 'Hệ tư tưởng - Lòng dân',
    question: 'Các thông tin sai lệch trên mạng xã hội đang gây chia rẽ khối đại đoàn kết. Bạn xử lý truyền thông như thế nào?',
    options: [
      { text: 'Kiểm soát chặt chẽ không gian mạng, xử phạt nặng sai phạm', effects: { economy: -5, socialJustice: 0, environment: 0, publicSupport: -20 } },
      { text: 'Tăng cường đối thoại, minh bạch hóa thông tin chính phủ', effects: { economy: +5, socialJustice: +15, environment: 0, publicSupport: +25 } },
      { text: 'Đầu tư cho các "KOLs" và truyền thông chính thống hấp dẫn hơn', effects: { economy: 0, socialJustice: +10, environment: 0, publicSupport: +15 } }
    ]
  }
];
  const handleChoiceClick = (option) => {
    // Cập nhật chỉ số
    const newStats = { ...stats };
    Object.keys(option.effects).forEach(key => {
      newStats[key] = Math.max(0, Math.min(100, newStats[key] + option.effects[key]));
    });
    setStats(newStats);

    // Hiển thị hiệu ứng
    setShowEffect(option.effects);
    
    setTimeout(() => {
      setShowEffect(null);
      
      // Chuyển sang câu tiếp theo hoặc kết thúc
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
      } else {
        setGamePhase('result');
      }
    }, 1500);
  };

  const getResultMessage = () => {
    const avgScore = (stats.economy + stats.socialJustice + stats.environment + stats.publicSupport) / 4;
    const balance = Math.max(...Object.values(stats)) - Math.min(...Object.values(stats));

    if (avgScore >= 70 && balance < 30) {
      return {
        title: '🏆 Lãnh Đạo Xuất Sắc',
        message: 'Bạn đã thành công trong việc điều hành đất nước qua thời kỳ quá độ! Tất cả các chỉ số đều ở mức tốt và cân bằng. Việt Nam đang trên con đường phát triển bền vững.',
        class: 'excellent'
      };
    } else if (avgScore >= 55 && balance < 40) {
      return {
        title: '👍 Quản Lý Tốt',
        message: 'Bạn đã duy trì sự ổn định và phát triển đất nước. Một số lĩnh vực cần chú ý thêm, nhưng nhìn chung đất nước đang đi đúng hướng.',
        class: 'good'
      };
    } else if (avgScore >= 40) {
      return {
        title: '⚠️ Gặp Khó Khăn',
        message: 'Một số quyết định của bạn đã tạo ra hậu quả tiêu cực. Cần có chiến lược cân bằng hơn giữa các mục tiêu phát triển.',
        class: 'struggling'
      };
    } else {
      return {
        title: '❌ Khủng Hoảng',
        message: 'Đất nước đang đối mặt với nhiều vấn đề nghiêm trọng. Cần phải xem xét lại toàn bộ chiến lược phát triển.',
        class: 'crisis'
      };
    }
  };

  const resetGame = () => {
    setStats({
      economy: 50,
      socialJustice: 50,
      environment: 50,
      publicSupport: 50
    });
    setCurrentScenario(0);
    setGamePhase('playing');
    setShowEffect(null);
  };

  if (gamePhase === 'result') {
    const result = getResultMessage();
    return (
      <section className="strategy-game" id="strategy-game">
        <div className="game-container">
          <div className={`result-screen ${result.class}`}>
            <h2 className="result-title">{result.title}</h2>
            <p className="result-message">{result.message}</p>
            
            <div className="final-stats">
              <h3>Chỉ Số Cuối Cùng</h3>
              <div className="final-stat-item">
                <span>💰 Kinh tế:</span>
                <span className="stat-value">{stats.economy}</span>
              </div>
              <div className="final-stat-item">
                <span>⚖️ Công bằng xã hội:</span>
                <span className="stat-value">{stats.socialJustice}</span>
              </div>
              <div className="final-stat-item">
                <span>🌱 Môi trường:</span>
                <span className="stat-value">{stats.environment}</span>
              </div>
              <div className="final-stat-item">
                <span>❤️ Lòng dân:</span>
                <span className="stat-value">{stats.publicSupport}</span>
              </div>
            </div>

            <button className="restart-button" onClick={resetGame}>
              Chơi Lại
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="strategy-game" id="strategy-game">
      <div className="game-container">
        <div className="game-header">
          <h2 className="game-title">🎮 Trò Chơi Chiến Lược</h2>
          <p className="game-subtitle">Quản lý Việt Nam trong thời kỳ quá độ</p>
        </div>

        <div className="stats-panel">
          <div className="stat-bar">
            <div className="stat-label">
              <span className="stat-icon">💰</span>
              <span className="stat-name">Kinh tế</span>
              <span className="stat-number">{stats.economy}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill economy" 
                style={{ width: `${stats.economy}%` }}
              ></div>
            </div>
          </div>

          <div className="stat-bar">
            <div className="stat-label">
              <span className="stat-icon">⚖️</span>
              <span className="stat-name">Công bằng xã hội</span>
              <span className="stat-number">{stats.socialJustice}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill social" 
                style={{ width: `${stats.socialJustice}%` }}
              ></div>
            </div>
          </div>

          <div className="stat-bar">
            <div className="stat-label">
              <span className="stat-icon">🌱</span>
              <span className="stat-name">Môi trường</span>
              <span className="stat-number">{stats.environment}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill environment" 
                style={{ width: `${stats.environment}%` }}
              ></div>
            </div>
          </div>

          <div className="stat-bar">
            <div className="stat-label">
              <span className="stat-icon">❤️</span>
              <span className="stat-name">Lòng dân</span>
              <span className="stat-number">{stats.publicSupport}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill support" 
                style={{ width: `${stats.publicSupport}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="scenario-panel">
          <div className="scenario-progress">
            Tình huống {currentScenario + 1}/{scenarios.length}
          </div>
          
          <div className="scenario-content">
            <h3 className="scenario-title">{scenarios[currentScenario].title}</h3>
            <p className="scenario-question">{scenarios[currentScenario].question}</p>
          </div>

          <div className="options-container">
            {scenarios[currentScenario].options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleChoiceClick(option)}
                disabled={showEffect !== null}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {showEffect && (
          <div className="effects-overlay">
            {Object.entries(showEffect).map(([key, value]) => {
              if (value === 0) return null;
              const labels = {
                economy: '💰 Kinh tế',
                socialJustice: '⚖️ Công bằng',
                environment: '🌱 Môi trường',
                publicSupport: '❤️ Lòng dân'
              };
              return (
                <div 
                  key={key} 
                  className={`effect-item ${value > 0 ? 'positive' : 'negative'}`}
                >
                  {labels[key]}: {value > 0 ? '+' : ''}{value}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
