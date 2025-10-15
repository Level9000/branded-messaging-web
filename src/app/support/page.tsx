'use client';

import React from "react";
import {
  BookOpen,
  MessageCircle,
  Mail,
  Bug,
  ChevronRight,
  DatabaseIcon,
} from 'lucide-react'
import Link from "next/link";
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Button } from '@/components/Button'

const links = [
  {
    icon: <BookOpen className="w-6 h-6 text-gold" />,
    title: "Tutorials",
    url: "https://www.youtube.com/channel/UCOGD_NRubtHDCvXXhoXojTw"
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-gold" />,
    title: "Discord",
    url: "https://discord.gg/MFMC9GhR"
  },
  {
    icon: <Mail className="w-6 h-6 text-gold" />,
    title: "Email Support",
    url: "mailto:support@pocketpanel.ai"
  },
  {
    icon: <Bug className="w-6 h-6 text-gold" />,
    title: "Report a Bug",
    url: "https://discord.gg/MFMC9GhR"
  },
  {
    icon: <DatabaseIcon className="w-6 h-6 text-gold" />,
    title: "Delete my Data",
    url: "https://www.pocketpanel.ai/delete"
  }
];

const SupportPage: React.FC = () => {
  return (
    <Layout>
      <Container className="relative isolate flex flex-col items-center justify-center py-20 text-center sm:py-32">
        <CirclesBackground className="absolute top-1/2 left-1/2 -z-10 mt-44 w-272.5 -translate-x-1/2 -translate-y-1/2 mask-[linear-gradient(to_bottom,white_20%,transparent_75%)] stroke-gray-300/30" />

        <h1 className="text-3xl font-medium tracking-tight text-gray-900 mb-3">
          Support & Resources
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Need help, want to learn more, or have feedback? Explore our support options below.
        </p>
        <div className="w-full max-w-md mx-auto flex flex-col space-y-3 mb-10 text-left">
  {links.map((link) => (
    <a
      key={link.title}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-4 py-4 rounded-lg bg-navy/90 hover:bg-navy transition group"
    >
      {link.icon}
      <span className="ml-4 text-black font-semibold text-lg group-hover:text-gold transition">
        {link.title}
      </span>
      <ChevronRight className="w-5 h-5 text-black group-hover:text-gold transition ml-auto" />
    </a>
  ))}
</div>


        <Button href="/" variant="outline" className="mt-4">
          Return to Home
        </Button>
      </Container>
    </Layout>
  );
};

export default SupportPage;
