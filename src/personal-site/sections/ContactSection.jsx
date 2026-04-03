import { Button } from "../../../design-system";
import SectionHeader from "../components/SectionHeader";
import { profile } from "../site-data";

export default function ContactSection() {
  return (
    <section className="site-section">
      <SectionHeader
        description="如果你正在做复杂业务产品、设计系统，或者想一起梳理某个体验问题，欢迎联系我。"
        eyebrow="Contact"
        title="联系我"
      />

      <div className="contact-layout">
        <div className="contact-card">
          <p className="contact-card__label">Phone & Mail</p>
          <p className="contact-card__value">{profile.phone}</p>
          <p className="contact-card__value">{profile.email}</p>
          <p className="contact-card__copy">
            我目前更适合通过邮件沟通项目背景、合作方式与具体需求。
          </p>
          <Button href={`mailto:${profile.email}`}>发邮件给我</Button>
        </div>

        <form className="contact-form">
          <label className="contact-form__field">
            <span>姓名</span>
            <input placeholder="怎么称呼你" type="text" />
          </label>

          <label className="contact-form__field">
            <span>邮箱</span>
            <input placeholder="你常用的邮箱" type="email" />
          </label>

          <label className="contact-form__field contact-form__field--full">
            <span>项目内容</span>
            <textarea
              placeholder="简单说说项目背景、当前阶段，以及你希望我参与的部分。"
              rows={6}
            />
          </label>

          <div className="contact-form__actions">
            <Button type="submit">发送消息</Button>
            <Button href={`mailto:${profile.email}`} variant="secondary">
              邮件联系
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
