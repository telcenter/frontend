import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router';
import { BACKEND_URL } from '../../../env';

const { Title } = Typography;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: { email: string; password: string }) => {
        const res = await fetch(`${BACKEND_URL}/admin/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Login failed:', data);
            alert(data.message || 'Đăng nhập thất bại');
        } else {
            alert("Đăng nhập thành công!");
            // TODO: AuthProvider
            navigate('/admin');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Trang Đăng nhập dành cho Quản trị viên</Title>
            <Form
                name="login_form"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Vui lòng điền email!' },
                        { type: 'email', message: 'Vui lòng điền email hợp lệ!' },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        type="email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        { required: true, message: 'Vui lòng điền mật khẩu!' },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Log In
                    </Button>
                </Form.Item>

                <p>Chưa có tài khoản? <Link to={'/admin/register'}>Đăng ký</Link></p>
            </Form>
        </div>
    );
};

export default LoginPage;
