# HIEU.DEV — Portfolio V6 (cập nhật UAV theo test_096)

Phiên bản này giữ giao diện ứng tuyển thực tập và cấu trúc ảnh/video đơn giản của V5, đồng thời cập nhật nội dung UAV theo log **test_096**; **mọi tư liệu ảnh, video và file CV nằm trong một thư mục `data/` duy nhất**. `assets/` chỉ có CSS/JS; `projects/` chỉ có các trang dự án. **Không cần đăng file log gốc lên website** vì chứa tọa độ GPS thực tế.

## 1. Cấu trúc thư mục (giữ nguyên trên GitHub)

```text
index.html
uav.html
cv.html
assets/
    style.css
    site.js
    uav-progress.js
projects/
    floodguard.html
    smart-light.html
    music-player.html
    analog-amplifier.html
    mobile-store.html
data/
    profile.jpg
    cv.pdf
    uav-photo.jpg
    uav-test096.png
    uav-test096-navigation.png
    uav-test092.png
    ... (các ảnh khác và video của bạn)
    TEN_FILE_CAN_THAY.txt
```

**`assets/`, `projects/`, `data/` đều đứng ngang cấp với `index.html`.** Không đưa `data/` vào trong `assets/` hoặc `projects/`.

## 2. Thay ảnh / thay CV: chỉ 3 thao tác

1. Mở `data/TEN_FILE_CAN_THAY.txt` và tìm tên đúng theo nội dung bạn muốn đổi.
2. Xuất ảnh đúng định dạng, sau đó **chép vào `data/` và đổi thành tên chính xác** như danh sách (ghi đè tệp cũ). Ví dụ đổi ảnh chân dung: `profile.jpg`; đổi ảnh UAV chính: `uav-photo.jpg`.
3. Đẩy lên GitHub Pages / refresh trình duyệt. **Không cần sửa code HTML hay JS.**

**Đổi CV:** chép CV PDF chính thức của bạn vào `data/cv.pdf` (ghi đè bản CV tham khảo hiện có). Nút **Tải CV (PDF)** trên trang chủ và trang CV sẽ dùng tệp mới tự động. `cv.html` vẫn là CV trực tuyến riêng; thay PDF không làm thay đổi thông tin trong `cv.html`.

**Chú ý định dạng:** Đổi đuôi tên tệp bằng Rename **không phải chuyển định dạng**. Nếu ảnh của bạn là PNG nhưng muốn thay `profile.jpg`, hãy *xuất/lưu thành JPEG* trước (ví dụ trong Preview trên macOS: File → Export → JPEG; trong Paint: Save as → JPEG). File PDF cũng phải là PDF thật. Nên giữ ảnh dưới 1–2 MB để web tải nhanh.

## 3. Danh sách tệp đang có (đổi cùng tên để cập nhật)

| Tên trong data/ | Tác dụng |
|---|---|
| `data/profile.jpg` | Ảnh chân dung trên trang chủ, JPG vuông (khuyên 600×600). |
| `data/cv.pdf` | CV chính thức để tải xuống, PDF. |
| `data/uav-photo.jpg` | Ảnh UAV chính, hiện trên trang chủ và trang UAV. |
| `data/uav-test096.png` | Biểu đồ độ cao và AltHold từ log test_096 (mới nhất). |
| `data/uav-test096-navigation.png` | Đồ thị GPS/heading từ test_096; không hiển thị tọa độ. |
| `data/uav-test092.png` | Biểu đồ lịch sử của test_092, vẫn giữ để đối chiếu. |
| `data/uav-flight-control.png` | Sơ đồ điều khiển bay, PID và safety gates. |
| `data/uav-system.png` | Sơ đồ kiến trúc STM32F405 / Raspberry Pi 5. |
| `data/uav-yolo-predictions.png` | Hình ảnh dự đoán YOLOv8. |
| `data/uav-yolo-training.png` | Biểu đồ quá trình huấn luyện YOLOv8. |
| `data/uav-yolo-pr.png` | Đường cong PR của YOLOv8 (đã chuẩn bị trong thư mục). |
| `data/uav-landingpadnet.png` | Sơ đồ LandingPadNet dự kiến. |
| `data/uav-web-gcs.png` | Ảnh màn hình Web GCS đang mô phỏng. |
| `data/uav-landing-pad.png` | Bản thiết kế bãi đáp AprilTag. |
| `data/uav-autoland-flow.png` | Sơ đồ state machine hạ cánh dự kiến. |
| `data/favicon.svg` | Biểu tượng website (SVG), nếu muốn thay. |
| `data/uav-schematic.svg` | Sơ đồ UAV vector dự phòng (SVG). |
| `data/project-floodguard.jpg` | Ảnh chính trang dự án FLOODGUARD, JPG ngang khuyên 1280×720. |
| `data/project-smart-light.jpg` | Ảnh chính trang dự án SMART LIGHT, JPG ngang khuyên 1280×720. |
| `data/project-music-player.jpg` | Ảnh chính trang dự án MUSIC PLAYER, JPG ngang khuyên 1280×720. |
| `data/project-analog-amplifier.jpg` | Ảnh chính trang dự án 15W AMPLIFIER, JPG ngang khuyên 1280×720. |
| `data/project-mobile-store.jpg` | Ảnh chính trang dự án MOBILE STORE, JPG ngang khuyên 1280×720. |

## 4. Ảnh và video tự xuất hiện khi bạn thêm file

Các tệp dưới đây **chưa có trong bộ ZIP** (vì bạn chưa cung cấp tư liệu thật). Bạn chỉ cần chép đúng tên vào `data/`, tải lại trang; giao diện sẽ tự kiểm tra và hiện chúng. Nếu thiếu file thì không hiện ô ảnh/video lỗi.

| Tên sẽ thêm | Tự động hiển thị ở đâu |
|---|---|
| `data/uav-f103-flight.jpg` | Ảnh bổ sung thử nghiệm F103 → tự xuất hiện ở mục minh chứng UAV. |
| `data/uav-f405-pcb.jpg` | Ảnh mạch F405 → tự xuất hiện ở mục minh chứng UAV. |
| `data/uav-flight-f103.mp4` | Video bay F103 → tự xuất hiện ở mục minh chứng UAV. |
| `data/uav-alt-hold-f405.mp4` | Video AltHold F405 → tự xuất hiện ở mục minh chứng UAV. |
| `data/project-floodguard-demo.mp4` | Video dự án FLOODGUARD → tự xuất hiện trên trang dự án. |
| `data/project-smart-light-demo.mp4` | Video dự án SMART LIGHT → tự xuất hiện trên trang dự án. |
| `data/project-music-player-demo.mp4` | Video dự án MUSIC PLAYER → tự xuất hiện trên trang dự án. |
| `data/project-analog-amplifier-demo.mp4` | Video dự án 15W AMPLIFIER → tự xuất hiện trên trang dự án. |
| `data/project-mobile-store-demo.mp4` | Video dự án MOBILE STORE → tự xuất hiện trên trang dự án. |

Dùng MP4 mã hóa H.264/AAC để tăng khả năng phát trên Chrome, Safari, điện thoại. Nếu video quá lớn, hãy tối ưu trước khi đưa lên GitHub Pages; không tự công bố tài liệu cần bảo mật.

## 5. Nếu muốn bổ sung nhiều ảnh hơn số ô đặt sẵn

Mở `assets/uav-progress.js`, tìm `media: [...]`, sao chép một dòng rồi sửa tên `src`, `title`, `note`. Đặt file tương ứng vào `data/`. Các mục hiện được cấu hình sẵn **không cần chỉnh JS**.

## 6. Kết quả UAV đã cập nhật từ test_096

- STM32F103/ICM20602 đã bay ổn định qua Mini6C/MC7RE.
- STM32F405 168 MHz, vòng điều khiển 400 Hz với Stabilize/AltHold trên UAV thật. `test_096`: 7.394 bản ghi A (~147,9 giây), 5.452 mẫu AH=1 liên tục (~109 giây), max ALT100=6,74 m. Đây không phải sai số giữ độ cao theo setpoint.
- Log `test_092` được giữ làm mốc cũ: ~6,5 giây AH=1, max ALT100=5,93 m.
- GPS `test_096`: FIX=3 ở cả 739 bản ghi NAV, 16–25 SV; receiver hAcc 0,492–0,818 m, không phải sai số vị trí so với mốc chuẩn. HTR=1 ở 1.440/1.478 POS, còn khoảng gián đoạn gần 3 giây.
- GPS/compass đã kiểm tra; Position Hold vẫn ở chế độ shadow.
- Pi 5 được lắp trên UAV, UART telemetry live; companion command chưa điều khiển motor.
- YOLOv8n đã huấn luyện baseline; mAP@0.5 0,9916 trên validation nội bộ, chưa đủ chứng minh khái quát ngoài trời.
- LandingPadNet mới thiết kế; AprilTag/autoland chưa bay thử. Web GCS dùng dữ liệu mô phỏng; LoRa chưa RF-test thực tế.

## 7. Phân tích kỹ thuật kèm theo

Đọc `ANALYSIS_test_096_VI.md` để xem phương pháp tính, bảng so sánh `test_092`/`test_096`, giới hạn của số liệu và những việc cần xác minh trước khi bật Position Hold.

Để thay biểu đồ: chép ảnh PNG mới đè lên **đúng tên** `data/uav-test096.png` hoặc `data/uav-test096-navigation.png`. Không đổi tên file HTML.

## 8. Đăng lên GitHub Pages

Tải ZIP V6, giải nén và đưa **tất cả** `index.html`, `uav.html`, `cv.html`, `assets/`, `projects/`, `data/` lên thư mục gốc repository. Khi thay từ V4, xóa thư mục `assets/uav/` cũ nếu còn vì không còn sử dụng. Không đổi hoa/thường trong tên tệp; GitHub Pages phân biệt chữ hoa chữ thường.

Cần lưu ý: thay thế ảnh hay CV trong `data/` không đồng bộ lại vào nguồn của GitHub ngay; phải commit/push bản cập nhật. Nếu hình cũ còn hiện, dùng hard refresh (`Cmd + Shift + R` hoặc `Ctrl + Shift + R`).
