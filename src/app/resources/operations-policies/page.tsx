"use client";
import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function WorkGuidelinesPage() {
  const rules = [
    {
      title: 'Work Shifts',
      items: [
        { text: 'Minimum Daily Time: 2.5 hours (2h shift + 30m update)' },
        { text: 'Record a Loom video detailing your work.' },
        { text: 'Include a written summary alongside the video.' },
        { text: 'Weekly Minimum: 5 hours; at least two 2.5h shifts.' },
      ],
    },
    {
      title: 'Online Presence',
      items: [
        { text: 'Stay visible (online status) on Discord during work hours.' },
        { text: 'Avoid invisible status to maintain real-time communication.' },
      ],
    },
    {
      title: 'Daily Updates',
      items: [
        { text: 'Post a Loom video at day end with face on camera.' },
        { text: 'Outline: Intro, tasks, outcomes, obstacles, next steps.' },
        { text: 'Share links to GitHub, docs, Figma, or other assets.' },
      ],
    },
    {
      title: 'Accountability & Protocols',
      items: [
        { text: 'Tag managers (Shah/Bea/Andrew/Dare) and pod leader.' },
        { text: 'Notify Andrew immediately for any schedule changes.' },
      ],
    },
    {
      title: 'Respectful Interactions',
      items: [
        { text: 'Maintain professional tone; avoid sarcasm or offense.' },
        { text: 'Engage actively in discussions and calls.' },
        { text: 'Offer and receive constructive feedback openly.' },
      ],
    },
    {
      title: 'Continuous Learning',
      items: [
        { text: 'Stay curious and share new insights with the team.' },
        { text: 'Experiment and innovate; questions drive growth.' },
      ],
    },
    {
      title: 'Well‑Being',
      items: [
        { text: 'Respect personal time; maintain work‑life balance.' },
        { text: 'Support colleagues and celebrate successes.' },
      ],
    },
    {
      title: 'Commit Messages',
      items: [
        { text: 'Use prefixes: feat, fix, refactor, style, test, docs, chore.' },
        { text: 'Use imperative, present tense; ≤50 chars; no period.' },
      ],
    },
    {
      title: 'API Documentation',
      items: [
        { text: 'Maintain concise README: setup, auth, examples.' },
        { text: 'Centralize specs so backend and clients align.' },
      ],
    },
  ];

  return (
    <main className="py-16 px-6 bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-12">Work Guidelines</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {rules.map((rule, idx) => (
          <div key={idx} className="border-l-4 border-purple-500 pl-6">
            <h2 className="flex items-center text-2xl font-semibold mb-4">
              <span className="mr-2 text-purple-500">{idx + 1}</span>
              {rule.title}
            </h2>
            <ul className="space-y-2">
              {rule.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="mt-1 mr-2 text-purple-400" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
