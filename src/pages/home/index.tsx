import { Space } from "antd";
import { ButtonLink } from "../../components/ButtonLink";

function Home() {
  return (<>
    <div>
      <h1>telcenter</h1>
      <p>Hệ thống trả lời tổng đài bán tự động của nhà mạng Viettel</p>

      <Space size='middle'>
        <ButtonLink type="primary" to="/user">Trang dành cho người dùng</ButtonLink>
        <ButtonLink to="/admin">Trang quản trị</ButtonLink>
      </Space>
    </div>
  </>
  )
}

export default Home;
