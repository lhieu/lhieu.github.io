/*
  HIEU.DEV – UAV progress. Update only when the new result has real supporting evidence.
  DO NOT claim that PosHold, LoRa or automatic landing are flight-tested before actual confirmation.
  Each card may be complete / progress / shadow / baseline / simulated / planned.
  Dates in updates describe publishing changes, not necessarily dates of flight tests.
*/
window.UAV_PROGRESS = {
  homeStages: [
    {number:'01',status:'complete',title:'STM32F103 / ICM20602',description:'Đã bay ổn định bằng điều khiển thủ công.'},
    {number:'02',status:'complete',title:'STM32F405 / AltHold',description:'Vòng 400 Hz; test_096 ghi nhận ~109 giây AltHold liên tục.'},
    {number:'03',status:'baseline',title:'YOLOv8n landing pad',description:'Đã train 1.882 ảnh; validation nội bộ, chưa đánh giá ngoài trời.'},
    {number:'04',status:'shadow',title:'Position Hold & AI landing',description:'PosHold chỉ shadow; hạ cánh tự động chưa bay thử.'}
  ],
  stages: [
    {
      number:'01',title:'STM32F103 – flight controller nền tảng',status:'complete',
      description:'Tự lập trình và bay ổn định với IMU ICM20602.',
      items:['Điều khiển thủ công với Mini6C / MC7RE.','Hoàn thiện nền tảng quadcopter để nâng cấp phần cứng và firmware.']
    },
    {
      number:'02',title:'STM32F405 – vòng điều khiển thời gian thực',status:'complete',
      description:'Bộ điều khiển bay STM32F405RGT6 168 MHz đã chạy trên UAV thật.',
      items:['Superloop bare-metal 400 Hz, angle/rate PID, Quad-X mixer và PWM ESC.','Tích hợp ICM20602, BMP388, GPS u-blox M10 và QMC5883L.','Logging; test_096 có 7.394 mẫu với FS=0, O=0 và DT ~2,5 ms.']
    },
    {
      number:'03',title:'Altitude Hold với BMP388',status:'progress',
      description:'Đã có 109 giây AH=1 liên tục trong test_096; vẫn cần đánh giá độ chính xác và overshoot.',
      items:['Log mới test_096: 5.452 mẫu AH=1 (~109,0 giây), liên tục từ ~34,46–143,48 s; max ALT100 = 6,74 m.','test_092 trước đó có 325 mẫu AH=1 (~6,5 giây). Cần đo sai số theo setpoint, dao động cuối bài thử và kiểm thử lặp lại.']
    },
    {
      number:'04',title:'GPS / Compass / Position Hold',status:'shadow',
      description:'GPS và la bàn đã tích hợp; Position Hold vẫn tính toán và ghi log, chưa tác động motor.',
      items:['test_096: 739/739 NAV đạt FIX=3/FOK=1; 16–25 vệ tinh; receiver hAcc 0,492–0,818 m, không phải sai số thực.','Heading trusted 1.440/1.478 POS (97,4%), còn gián đoạn ~3 giây; không đủ chứng cứ bật PosHold live.','Position P → velocity PID → góc nghiêng đã có khung xử lý; toàn bộ 1.478 POS vẫn SHD=1, ALW=0, ACT=0.']
    },
    {
      number:'05',title:'Raspberry Pi 5 và giao thức companion',status:'shadow',
      description:'Pi 5 đã gắn trên UAV; telemetry song công đã xây dựng, điều khiển companion vẫn khóa.',
      items:['UART 115200, frame có sequence, timeout và CRC16/CCITT-FALSE; test_096 không thấy companion điều khiển live.','Telemetry live khoảng 50 Hz; control chỉ bench/shadow, chưa cấp quyền điều khiển động cơ.','Cần bổ sung replay protection và nối climb-rate vào controller.']
    },
    {
      number:'06',title:'YOLOv8n – baseline nhận diện bãi đáp',status:'baseline',
      description:'Đã huấn luyện detector một lớp landing_pad, chưa chứng minh khả năng ngoài trời.',
      items:['Dataset 1.882 ảnh; 1.319 train / 375 val / 188 test.','Huấn luyện nối tiếp 50 + 30 + 30 epoch ở 640 px.','mAP@0.5 tốt nhất 0,9916 trên validation nội bộ; cảnh giữa các tập còn tương đồng.']
    },
    {
      number:'07',title:'LandingPadNet – detector tùy biến',status:'planned',
      description:'Đã đặc tả kiến trúc, chưa có code và chưa huấn luyện.',
      items:['Backbone nhẹ, Light FPN P2–P5 và anchor-free head dự đoán box/tâm.','Sẽ benchmark FPS, latency và sai số tâm trên Raspberry Pi 5.']
    },
    {
      number:'08',title:'Bãi đáp AprilTag và autoland hybrid',status:'planned',
      description:'Đã thiết kế bãi đáp 5 AprilTag; chưa tích hợp/kiểm chứng quá trình đáp đất.',
      items:['Thiết kế chữ H với 5 tag36h11 và phương hướng N–E–S–W.','Dự kiến dùng NN để tìm bãi đáp xa và AprilTag để căn chính xác khi ở gần.','Cần hiệu chuẩn camera, đo kích thước tag và kiểm thử state machine.']
    },
    {
      number:'09',title:'Web GCS – trung tâm điều hành nhiệm vụ',status:'simulated',
      description:'Đã có giao diện và mô phỏng nhiệm vụ; dữ liệu hiển thị chưa phải telemetry UAV thật.',
      items:['Bản đồ, độ cao, vận tốc, pin, trạng thái GPS và tham số waypoint.','Mô phỏng cất cánh – hành trình – hạ cánh – hoàn tất.','Chưa có đường điều khiển từ Web đến FC trong chuyến bay thật.']
    },
    {
      number:'10',title:'LoRa và hạ cánh chính xác khép kín',status:'planned',
      description:'Đang thiết kế/định hướng; chưa RF test và chưa thử nghiệm autoland.',
      items:['Chưa xác minh gói tin, độ trễ hay mất gói đường STM32–LoRa–Pi 5.','Ưu tiên watchdog, low-battery failsafe, AltHold và PosHold trước khi bật companion control.','Thử nghiệm bench → shadow → tether/low altitude → autoland có giám sát.']
    }
  ],
  updates: [
    {
      date:'2026-10-14',status:'progress',
      title:'test_096: AltHold kích hoạt liên tục ~109 giây',
      description:'Phân tích 10.351 dòng log: 7.394 bản ghi A (~147,9 giây), 5.452 mẫu AH=1 liên tiếp, max ALT100 6,74 m; 739/739 NAV có GPS 3D fix, HTR=1 ở 1.440/1.478 POS. PosHold vẫn SHD=1 / ACT=0; chưa có autoland. Ngày ghi là ngày cập nhật portfolio, không khẳng định ngày bay.'
    },

    {
      date:'2026-10-14',status:'progress',
      title:'Tổng hợp tiến độ và minh chứng từ báo cáo PBL5',
      description:'Cập nhật hồ sơ dự án với kết quả log STM32F405, AltHold, GPS/heading, YOLOv8n, ảnh thiết bị và Web GCS mô phỏng. Đây là ngày cập nhật portfolio, không phải ngày diễn ra tất cả phép thử.'
    }
  ],
  media: [
    // Slots already configured. To publish a file, simply copy it to data/ with
    // the EXACT name below. Missing optional files do not appear on the website.
    {type:'image',src:'data/uav-f103-flight.jpg',title:'Ảnh UAV khi thử nghiệm F103',note:'Bổ sung ảnh thật khi có tư liệu',optional:true},
    {type:'image',src:'data/uav-f405-pcb.jpg',title:'Ảnh mạch điều khiển STM32F405',note:'PCB và phần cứng thực tế',optional:true},
    {type:'video',src:'data/uav-flight-f103.mp4',title:'Video UAV bay bằng STM32F103',note:'Tư liệu thực tế khi được bổ sung',optional:true},
    {type:'video',src:'data/uav-alt-hold-f405.mp4',title:'Video thử nghiệm AltHold với STM32F405',note:'Thử nghiệm ngoài thực tế khi được bổ sung',optional:true}
    // If you need more media slots, copy one of the lines above and change its name.

  ]
};
