import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTopDoctorHomeService, getAllSpecialty, getAllHandbook, getAllClinic } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/Section/HomeFooter";
import { useNavigate } from "react-router-dom";
const Seemore = () => {
  const { section } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!section) return;
      setLoading(true);

      try {
        let res;
        switch (section) {
          case "doctor":
            res = await getTopDoctorHomeService(12);
            console.log("Dữ liệu bác sĩ:", res);
            break;
          case "specialty":
            res = await getAllSpecialty();
            console.log("Dữ liệu chuyên khoa:", res);
            break;
          case "handbook":
            res = await getAllHandbook();
            break;
          case "clinic":
            res = await getAllClinic();
            break;
          default:
            setData([]);
            setLoading(false);
            return;
        }

        setData(res?.data || []);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [section]);
  const navigate = useNavigate();

  const handleViewSection = (item) => {
    switch (section) {
      case "doctor":
        navigate(`/detail-doctor/${item.id}`);
        break;
      case "specialty":
        navigate(`/detail-specialty/${item.id}`);
        break;
      case "handbook":
        navigate(`/detail-handbook/${item.id}`);
        break;
      case "clinic":
        navigate(`/detail-clinic/${item.id}`);
        break;
      default:
        console.warn("Không tìm thấy section phù hợp!");
    }
  };
  return (
    <div>
      <div>
        <HomeHeader></HomeHeader>
        <h2>{section === "doctor" ? "Bác sĩ nổi bật" : section === "specialty" ? "Chuyên khoa" : section === "handbook" ? "Cẩm nang" : "Phòng khám"}</h2>
      </div>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : data.length > 0 ? (
        <div
          style={{
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {data?.length > 0 &&
            data.map((item, index) => {
              let imageBase64 = "";

              if (item.image?.data) {
                try {
                  // Chuyển mảng số thành chuỗi
                  const base64String = String.fromCharCode(...item.image.data);

                  // Kiểm tra nếu đã có prefix data:image
                  if (base64String.startsWith("data:image")) {
                    imageBase64 = base64String;
                  } else {
                    // Nếu thiếu MIME type, đoán định dạng ảnh
                    let mimeType = "image/png"; // Mặc định là PNG

                    if (base64String.includes("/9j/")) mimeType = "image/jpeg"; // JPG
                    else if (base64String.includes("R0lGOD")) mimeType = "image/gif"; // GIF
                    else if (base64String.includes("UklGR")) mimeType = "image/webp"; // WEBP
                    else if (base64String.includes("iVBOR")) mimeType = "image/png"; // PNG

                    imageBase64 = `data:${mimeType};base64,${base64String}`;
                  }
                } catch (error) {
                  console.error("Lỗi khi chuyển đổi ảnh:", error);
                  imageBase64 = ""; // Nếu lỗi, để trống ảnh
                }
              } else {
                imageBase64 = item.image; // Nếu đã là URL, sử dụng trực tiếp
              }

              return (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    textAlign: "center",
                  }}
                  onClick={() => handleViewSection(item)}
                >
                  <img
                    src={imageBase64}
                    alt={item.name}
                    style={{
                      width: section === "doctor" ? "200px" : "200px", // Giữ width cố định
                      height: section === "doctor" ? "300px" : "200px", // Chiều cao khác nhau
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />

                  <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{item.name}</h3>

                  {section === "doctor" && (
                    <>
                      <div style={{ marginTop: "10px", fontSize: "18px" }}>
                        <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{`${item.lastName} ${item.firstName}`}</h3>
                      </div>
                      <p style={{ color: "#555" }}>{item.positionData.valueVi}</p>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <p>Không có dữ liệu</p>
      )}
      <HomeFooter />
    </div>
  );
};

export default Seemore;
