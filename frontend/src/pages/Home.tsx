import { Link } from 'react-router-dom';
import { ShoppingBagIcon, SparklesIcon, RocketLaunchIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { AddProductForm } from '../components/AddProductForm';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { isAuthenticated, user } = useAuth();


    return (
        <div className="flex min-h-screen flex-col bg-[#0f0f13] text-gray-100 selection:bg-blue-500/30">
            {/* Hero Section */}
            <main className="flex flex-grow flex-col">
                <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
                    {/* Background Glows */}
                    <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"></div>
                    <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]"></div>
                    <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[150px]"></div>

                    <div className="layout-container relative z-10 text-center">
                        <div className="mb-8 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-md">
                            <SparklesIcon className="h-4 w-4 text-blue-400" />
                            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">New Collection 2026</span>
                        </div>

                        <h1 className="mb-6 animate-fade-in-up text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl">
                            Elevate Your <br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Digital Lifestyle</span>
                        </h1>

                        <p className="mx-auto mb-12 max-w-2xl animate-fade-in-up text-lg text-gray-400 sm:text-xl" style={{ animationDelay: '100ms' }}>
                            Experience the future of e-commerce with ShopGrid. Curated premium products, lightning-fast delivery, and an interface designed for the modern age.
                        </p>

                        <div className="flex animate-fade-in-up flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '200ms' }}>
                            <Link
                                to="/shop"
                                className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-white px-8 py-4 text-base font-bold text-black transition-all hover:scale-105 active:scale-95"
                            >
                                <ShoppingBagIcon className="h-5 w-5" />
                                Start Shopping
                                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold transition-all hover:bg-white/10">
                                <RocketLaunchIcon className="h-5 w-5 border-blue-400" />
                                View Features
                            </button>
                        </div>
                    </div>
                </section>

                {/* Admin Add Product Section */}
                {isAuthenticated && user?.role === 'admin' && (
                    <section className="border-t border-white/5 bg-white/[0.02] py-20">
                        <div className="layout-container">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Admin Dashboard
                                </h2>
                                <p className="mx-auto max-w-2xl text-lg text-gray-400">
                                    List new experimental products and handle inventory from this panel.
                                </p>
                            </div>
                            <AddProductForm />
                        </div>
                    </section>
                )}


                {/* Features Highlight */}


                <section className="border-t border-white/5 bg-black/20 py-24 backdrop-blur-sm">
                    <div className="layout-container">
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
                            {[
                                { title: 'Fast Delivery', desc: 'Global shipping in under 48 hours with real-time tracking.', icon: RocketLaunchIcon, color: 'text-blue-400' },
                                { title: 'Premium Quality', desc: 'Every product is hand-picked and tested for the highest standards.', icon: SparklesIcon, color: 'text-emerald-400' },
                                { title: 'Modern UI', desc: 'A seamless, lightning-fast experience across all your devices.', icon: ShoppingBagIcon, color: 'text-indigo-400' }
                            ].map((feature, i) => (
                                <div key={i} className="group rounded-3xl border border-white/5 bg-white/2 p-8 transition-all hover:border-white/10 hover:bg-white/5">
                                    <div className={`mb-6 inline-flex rounded-2xl bg-white/5 p-4 ${feature.color}`}>
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-500">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
