// lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import type { Database } from "@/types/supabase"; // optional

export const createClient = async () => {
  // Next 15: await first (to satisfy "sync dynamic APIs" rule)
  const cookieStore = await cookies();

  // Important: pass the cookie store itself (NOT a Promise)
  return createServerComponentClient/*<Database>*/(
    { cookies: () => cookieStore } as any // cast keeps TS happy across helper versions
  );
};
