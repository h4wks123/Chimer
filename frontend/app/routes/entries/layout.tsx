import { GridScan } from "~/components/GridScan";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main className="relative w-screen h-screen overflow-y-auto">
      <section className="fixed inset-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#0F2E1B"
          gridScale={0.1}
          scanColor="#21ba59"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </section>
      <Outlet />
    </main>
  );
}
