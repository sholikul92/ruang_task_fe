import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/templates/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex w-full overflow-x-hidden min-h-screen'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
