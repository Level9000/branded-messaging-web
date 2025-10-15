'use client';

import React from "react";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import Image from "next/image";
import PocketPanelLogo from '@/images/pocket-panel-logo.png'

const FailurePage: React.FC = () => {
  return (
    <Layout>
      {/* Banner */}
      <section className="w-full bg-navy text-gold py-16 px-4 text-center rounded-b-3xl shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Failed</h1>
        <div className="flex justify-center my-6">
          <Image
            src={PocketPanelLogo}
            alt="Pocket Panel Logo"
            width={80}
            height={80}
            className="rounded-full"
            priority
          />
        </div>
        <p className="text-xl font-medium text-gold-light mt-2">We weren’t able to complete your subscription.</p>
      </section>

      {/* Instructions */}
      <section className="bg-off-white text-black w-full py-8 px-4">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-base md:text-lg font-medium leading-relaxed">
              Don’t worry — no payment was processed, and you haven’t been charged. You can try again anytime by visiting the <b>Manage Subscription</b> section in the user settings of the Pocket Panel app.
            </p>
            <p className="text-base md:text-lg font-medium leading-relaxed">
              If you need help, reach out to our support team from the app’s support tab.
            </p>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default FailurePage;
