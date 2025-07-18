import React, { useEffect } from "react";
import AxiosInstance from "../../../../../../../api/http";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export default function Sil({ selectedRows, setSelectedCards, refreshTableData, disabled, hidePopover }) {
  // selectedRows.forEach((row, index) => {
  //   console.log(`Satır ${index + 1} ID: ${row.key}`);
  //   // Eğer id değerleri farklı bir özellikte tutuluyorsa, row.key yerine o özelliği kullanın. Örneğin: row.id
  // });

  // Sil düğmesini gizlemek için koşullu stil
  const buttonStyle = disabled ? { display: "none" } : {};

  // Silme işlemini tetikleyecek fonksiyon
  const handleDelete = async () => {
    try {
      // Silme API isteğini array ile gönder
      const response = await AxiosInstance.post(
        `Report/DeleteReportById`,
        selectedRows.map((row) => row.key)
      );
      console.log("Silme işlemi başarılı:", response);

      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 204) {
        message.success("İşlem Başarılı.");
        refreshTableData();
        setSelectedCards([]);
        hidePopover(); // Silme işlemi başarılı olursa Popover'ı kapat
      } else if (response.data.statusCode === 401) {
        message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else if (response.data.statusCode === 500) {
        message.error(response.data.message);
      } else {
        message.error("İşlem Başarısız.");
      }
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
      message.error("Silme işlemi sırasında hata oluştu.");
    }
  };

  // const handleDelete = async () => {
  //   let isError = false;
  //   // Local storage'dan userId değerini al
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   // Seçili satırlar üzerinde döngü yaparak her birini sil
  //   for (const row of selectedRows) {
  //     try {
  //       // Silme API isteğini gönder
  //       const response = await AxiosInstance.post(`IsEmriDelete`, {
  //         ID: row.key,
  //         // KulID: user.userId,
  //       });
  //       console.log("Silme işlemi başarılı:", response);
  //       // Burada başarılı silme işlemi sonrası yapılacak işlemler bulunabilir.
  //     } catch (error) {
  //       console.error("Silme işlemi sırasında hata oluştu:", error);
  //     }
  //   }
  //   // Tüm silme işlemleri tamamlandıktan sonra ve hata oluşmamışsa refreshTableData'i çağır
  //   if (!isError) {
  //     refreshTableData();
  //     hidePopover(); // Silme işlemi başarılı olursa Popover'ı kapat
  //   }
  // };

  return (
    <div style={buttonStyle}>
      <Popconfirm
        title="Silme İşlemi"
        description="Bu öğeyi silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
        okText="Evet"
        cancelText="Hayır"
        icon={
          <QuestionCircleOutlined
            style={{
              color: "red",
            }}
          />
        }
      >
        <Button style={{ paddingLeft: "0px" }} type="link" danger icon={<DeleteOutlined />}>
          Sil
        </Button>
      </Popconfirm>
    </div>
  );
}
