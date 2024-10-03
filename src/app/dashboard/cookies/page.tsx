import { TabBar } from "@/components/TabBar";
import { cookies } from "next/headers";

export const metadata = {
 title: 'Cookies  page',
 description: 'SEO page',
};

export default function CookiesPage() {
  const cookieStore = cookies()
  const cookiesTab = cookieStore.get('selectedTab')?.value ?? '1'
  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">tabs</span>
        <TabBar  currentTab={+cookiesTab}/>{/* el mas sirve para cambiarlo a number es como colocarle Number a todo cookiesTab */}

      </div>
    </div>
  )
}
