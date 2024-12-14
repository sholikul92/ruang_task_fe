import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className='flex w-full overflow-x-hidden min-h-screen'>{children}</main>
    </SidebarProvider>
  );
}
