"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { ContactModal, type ContactContext } from "@/components/contact/ContactModal";

type OpenContactFn = (ctx?: ContactContext) => void;

const ContactCtx = createContext<OpenContactFn | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [ctx, setCtx] = useState<ContactContext | null>(null);

  const openContact = useCallback<OpenContactFn>((next) => {
    setCtx(next ?? {});
  }, []);

  return (
    <ContactCtx.Provider value={openContact}>
      {children}
      <ContactModal
        isOpen={ctx !== null}
        onClose={() => setCtx(null)}
        context={ctx ?? undefined}
      />
    </ContactCtx.Provider>
  );
}

export function useContact(): OpenContactFn {
  const fn = useContext(ContactCtx);
  if (!fn) {
    throw new Error("useContact must be used inside <ContactProvider>");
  }
  return fn;
}
