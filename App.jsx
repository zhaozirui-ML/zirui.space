import PersonalWebsite from "./src/personal-site/PersonalWebsite";

// 把入口保持成极简外壳，后面无论替换成真实业务页还是继续拆分，都只需要动这一层。
export default function App() {
  return <PersonalWebsite />;
}
