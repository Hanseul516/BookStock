import React, { useRef, useState, useEffect } from "react";
import './index.css'
import { Link } from "react-router-dom";
import logo from '../../img/logo2Cut.jpg';
import emailjs from '@emailjs/browser';

const LostPwd = function () {
  const form = useRef();

  // 초기 상태를 빈 문자열로 설정
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [newPwd, setNewPwd] = useState(''); 

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    let generatedPwd = "";
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      generatedPwd += chars[randomIndex];
    }
    return generatedPwd;
  };

  useEffect(() => {
    if (newPwd !== '') {
      emailjs.sendForm('service_m8s3p04', 'template_0n4pomu', form.current, 'WnKyAvQ7Xbhx7cSc5', {
        generatedPwd: newPwd, 
      })
        .then((result) => {
          alert("메일 전송이 완료되었습니다.");
          console.log(result, result.text);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert("메일 전송이 실패했습니다.");
        });
    }
  }, [newPwd]);

  const sendEmail = (e) => {
    e.preventDefault();

    const generatedPwd = generateRandomPassword();

    setNewPwd(generatedPwd);
  };

  return (
    <div className="wrapper bg-white">
      <div className="logo">
        <img src={logo} alt="BookStock" />
      </div>
      <form className="pt-3" ref={form} onSubmit={sendEmail}>
        <div className="form-group py-2">

          
          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input
              type="hidden"
              name="generatedPwd"
              id="random"
              placeholder="임시비밀번호"
              required
              value={newPwd}
              readOnly 
            />
          </div>

          <br/>

          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input
              type="text"
              name="user_email"
              placeholder="이메일을 입력하세요"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-block btn-primary text-center my-3" type="submit">
          인증메일 발송
        </button>

        <div className="text-center pt-3 text-muted">
          북스탁 회원이 아닌가요?{" "}
          <span className="signup">
            <Link to="./../signUp">회원가입</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LostPwd;
