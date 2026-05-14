"use client";

import { useState } from "react";
import { User, Mail, Phone, Users, Calendar, Dumbbell, Send, CheckCircle2 } from "lucide-react";

export function TrainingRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [joinType, setJoinType] = useState("single");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after a few seconds or keep showing success message
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center max-w-2xl mx-auto my-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Request Received!</h3>
        <p className="text-green-700 dark:text-green-400">
          Thank you for reaching out. Our team will review your details and get back to you shortly to arrange a trainer.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-medium"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden my-12">
      <div className="bg-red-600 p-8 text-center">
        <h2 className="text-3xl font-black text-white mb-2">Request a Trainer</h2>
        <p className="text-red-100 max-w-xl mx-auto">
          Fill out the form below and we'll match you with the perfect coach for your goals.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <User size={16} className="text-red-500" /> Full Name
            </label>
            <input 
              required
              id="name"
              type="text" 
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Mail size={16} className="text-red-500" /> Email Address
            </label>
            <input 
              required
              id="email"
              type="email" 
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <label htmlFor="contact" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Phone size={16} className="text-red-500" /> Contact Number
            </label>
            <input 
              required
              id="contact"
              type="tel" 
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>

          {/* Age Group */}
          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Calendar size={16} className="text-red-500" /> Age Group
            </label>
            <select 
              required
              id="age"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition appearance-none"
            >
              <option value="">Select age group</option>
              <option value="under-18">Under 18</option>
              <option value="18-25">18 - 25</option>
              <option value="26-35">26 - 35</option>
              <option value="36-45">36 - 45</option>
              <option value="46+">46+</option>
            </select>
          </div>
        </div>

        {/* Training Type */}
        <div className="space-y-2">
          <label htmlFor="trainingType" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Dumbbell size={16} className="text-red-500" /> Training Type
          </label>
          <select 
            required
            id="trainingType"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition appearance-none"
          >
            <option value="">What kind of training are you looking for?</option>
            <option value="boxing-basics">Boxing Basics & Fundamentals</option>
            <option value="cardio-fitness">Cardio & Fitness Boxing</option>
            <option value="amateur">Amateur Boxing Preparation</option>
            <option value="pro">Pro Boxing Training</option>
            <option value="self-defense">Self Defense</option>
            <option value="other">Other (Specify in notes)</option>
          </select>
        </div>

        {/* Join Type and Conditional Group Size */}
        <div className="p-5 border border-gray-100 dark:border-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/50">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-4">
            <Users size={16} className="text-red-500" /> How will you be joining?
          </label>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <label className="flex-1 cursor-pointer">
              <input 
                type="radio" 
                name="joinType" 
                value="single" 
                className="peer sr-only"
                checked={joinType === "single"}
                onChange={(e) => setJoinType(e.target.value)}
              />
              <div className="w-full text-center px-4 py-3 border-2 rounded-xl peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 peer-checked:text-red-700 dark:peer-checked:text-red-400 font-medium text-gray-600 dark:text-gray-400 transition hover:bg-gray-50 dark:hover:bg-zinc-800">
                Just me (Single)
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input 
                type="radio" 
                name="joinType" 
                value="group" 
                className="peer sr-only"
                checked={joinType === "group"}
                onChange={(e) => setJoinType(e.target.value)}
              />
              <div className="w-full text-center px-4 py-3 border-2 rounded-xl peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 peer-checked:text-red-700 dark:peer-checked:text-red-400 font-medium text-gray-600 dark:text-gray-400 transition hover:bg-gray-50 dark:hover:bg-zinc-800">
                Group of people
              </div>
            </label>
          </div>

          {joinType === "group" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-4 space-y-2">
              <label htmlFor="groupSize" className="text-sm font-medium text-gray-600 dark:text-gray-400">
                How many people in your group?
              </label>
              <input 
                required={joinType === "group"}
                id="groupSize"
                type="number" 
                min="2"
                max="50"
                placeholder="E.g. 3"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition disabled:opacity-70 shadow-lg shadow-red-600/20"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send size={20} /> Request Trainer
            </>
          )}
        </button>
      </form>
    </div>
  );
}
