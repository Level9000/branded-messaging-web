'use client';

import React from "react";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import Image from "next/image";
import PocketPanelLogo from '@/images/pocket-panel-logo.png'

const SuccessPage: React.FC = () => {
  return (
    <Layout>
      {/* Banner */}
      <section className="w-full bg-navy text-gold py-16 px-4 text-center rounded-b-3xl shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Subscription was Successful.</h1>
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
        <p className="text-xl font-medium text-gold-light mt-2">Welcome to Pocket Panel Pro!</p>
      </section>

      {/* Benefits Section */}
      <section className="bg-off-white text-black w-full py-8 px-4">
        <Container>
          <div className="max-w-2xl mx-auto">
            <p className="text-base md:text-lg font-medium leading-relaxed">
              As a <b>Pro member</b>, you now have access to exciting features like creating custom board members, joining focus groups, starting board meetings, and gaining access to a growing library of business accelerator workshops.<br /><br />
              To manage your subscription and cancel anytime, visit the <b>manage subscription</b> section of the user settings page within the app.
            </p>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default SuccessPage;
