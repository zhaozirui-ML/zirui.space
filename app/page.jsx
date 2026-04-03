import SiteLayout from "../src/site/components/SiteLayout";
import HomePage from "../src/site/pages/HomePage";

// 首页切到新的站点层实现，避免继续经过旧的 App.jsx 中转。
export default function Page() {
  return (
    <SiteLayout>
      <HomePage />
    </SiteLayout>
  );
}
