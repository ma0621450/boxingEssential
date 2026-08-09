import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import liveBg from "@/public/livematch.jpg";
import { SITE_BASE_URL } from "@/lib/sitemap-data";

export const metadata: Metadata = {
  title: "Live Boxing Streams",
  description:
    "Watch live boxing streams and fight night coverage on Boxing Essential. Championship events, sponsored bouts, and upcoming match streaming.",
  alternates: { canonical: `${SITE_BASE_URL}/live` },
  openGraph: {
    title: "Live Boxing Streams | Boxing Essential",
    description:
      "Stream live boxing events and fight coverage exclusively on Boxing Essential.",
    url: `${SITE_BASE_URL}/live`,
    type: "website",
  },
};

export default function LivePage() {
    const isLive = false;

    const liveEvent = {
        title: "Championship Fight Night",
        description:
            "Live boxing events and sponsored fight coverage streamed exclusively on Boxing Essential.",
        streamUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
        sponsor: "Elite Boxing Promotions",
    };

    // const affiliateProducts = [
    //     {
    //         id: 1,
    //         title: "Pro Training Boxing Gloves",
    //         description:
    //             "Premium gloves designed for sparring, heavy bag work, and advanced training.",
    //     },
    //     {
    //         id: 2,
    //         title: "Professional Hand Wraps",
    //         description:
    //             "Comfortable and durable wraps for daily boxing sessions and protection.",
    //     },
    // ];

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="relative overflow-hidden border-b border-zinc-900">
                <Image
                    src={liveBg}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />

                <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 text-center drop-shadow-lg">

                    <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                        Live Boxing Streams & Sponsored Events
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
                        Watch live boxing matches, sponsored fight nights, and exclusive
                        event coverage.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16">
                {isLive ? (
                    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                        <div className="aspect-video w-full">
                            <iframe
                                src={liveEvent.streamUrl}
                                title="Live Stream"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="h-full w-full"
                            />
                        </div>

                        {/* EVENT INFO */}
                        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                                    LIVE NOW
                                </div>

                                <h2 className="text-3xl font-bold">
                                    {liveEvent.title}
                                </h2>

                                <p className="mt-3 max-w-2xl text-zinc-400">
                                    {liveEvent.description}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-center">
                                <p className="text-xs uppercase tracking-widest text-zinc-500">
                                    Sponsored By
                                </p>

                                <p className="mt-2 text-lg font-semibold">
                                    {liveEvent.sponsor}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-8 py-20 text-center">
                        <div className="mx-auto max-w-3xl">
                            <div className="mb-4 inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
                                No Active Stream
                            </div>

                            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                                Want Your Boxing Event Streamed Here?
                            </h2>

                            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
                                Partner with Boxing Essential to livestream your sponsored
                                boxing events and reach a growing audience of boxing fans across
                                the United States.
                            </p>

                            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                                <Link href="/contact-us" className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-semibold transition hover:bg-red-500">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* MONETIZATION SECTION */}
            <section className="mx-auto max-w-6xl px-6 pb-20">
                <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                    {/* AFFILIATE PRODUCTS */}
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
                        <div className="mb-8">
                            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                                Recommended Gear
                            </p>

                            <h3 className="mt-2 text-3xl font-bold">
                                Boxing Essentials
                            </h3>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* {affiliateProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-red-500/50"
                                >
                                    <div className="aspect-square rounded-2xl bg-zinc-800 transition group-hover:bg-zinc-700" />

                                    <h4 className="mt-5 text-xl font-semibold">
                                        {product.title}
                                    </h4>

                                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                                        {product.description}
                                    </p>

                                    <button className="mt-6 w-full rounded-xl bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-500">
                                        Check Price
                                    </button>
                                </div>
                            ))} */}
                        </div>
                    </div>

                    {/* ADS + SPONSOR CTA */}
                    <div className="space-y-6">
                        {/* AD SPACE */}
                        <div className="flex h-60 items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 text-zinc-500">
                            Advertisement Space
                        </div>

                        {/* SPONSOR CTA */}
                        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
                            <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                                Sponsorship
                            </p>

                            <h3 className="mt-3 text-3xl font-bold leading-tight">
                                Promote Your Boxing Brand Here
                            </h3>

                            <p className="mt-4 text-zinc-400">
                                Reach boxing fans through livestream sponsorships, featured
                                placements, and event promotions.
                            </p>
                            <Link href="/contact-us">
                                <button className="mt-8 w-full rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200">
                                    Contact For Advertising
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}