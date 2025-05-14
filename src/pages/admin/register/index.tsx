import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined, KeyOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router';
import { BACKEND_URL } from '../../../env';

const { Title } = Typography;

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: { email: string; password: string; secretKey: string }) => {
        const res = await fetch(`${BACKEND_URL}/admin/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Register failed:', data);
            const messageRaw = ("" + (data.message ?? "")).toLowerCase();
            if (messageRaw.includes("unique constraint") && messageRaw.includes("email")) {
                alert("Tài khoản có email này đã tồn tại");
            } else {
                alert(data.message || 'Đăng ký thất bại');
            }
        } else {
            alert("Đăng ký thành công, vui lòng đăng nhập.");
            navigate('/admin/login');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Đăng ký tài khoản Quản trị viên</Title>
            <Form
                name="register_form"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Nhập email"
                        type="email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Nhập mật khẩu"
                    />
                </Form.Item>

                <Form.Item
                    name="confirm_password"
                    label="Xác nhận mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<SafetyOutlined />}
                        placeholder="Nhập lại mật khẩu"
                    />
                </Form.Item>


                <Form.Item
                    name="secret_key"
                    label="Mã bí mật"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mã bí mật!' },
                    ]}
                >
                    <Input.Password
                        prefix={<KeyOutlined />}
                        placeholder="Nhập mã bí mật"
                    />
                </Form.Item>

                <p>Vui lòng liên hệ quản trị viên hoặc cấp trên của bạn để nhận mã bí mật cho phép tạo tài khoản quản trị viên mới trên hệ thống.</p>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form.Item>

                <p>Đã có tài khoản? <Link to={'/admin/login'}>Đăng nhập</Link></p>
            </Form>
        </div>
    );
};

export default RegisterForm;
