export type Video = {
  slug: string;
  title: string;
  description: string;
  category: 'gym' | 'boxing' | 'fitness';
  youtubeId: string;
  thumbnail: string;
  duration: string;
  views: string;
  date: string;
};

export const videos: Video[] = [
  // --- BOXING TRAINING (9 videos) ---
  {
    slug: "footwork-drills-mastery",
    title: "Essential Footwork Drills: Movement & Balance in the Ring",
    description: "Footwork is the most critical foundation in boxing. In this instructional guide, coach Tony Jeffries breaks down the lateral step, pivot mechanics, and standard distance management to help you glide across the ring without losing your balance or stance.",
    category: "boxing",
    youtubeId: "a3z9E9R-k4Q",
    thumbnail: "https://images.pexels.com/photos/4761359/pexels-photo-4761359.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "9:24",
    views: "15.2K",
    date: "2025-05-14"
  },
  {
    slug: "heavy-bag-combinations",
    title: "Heavy Bag Workouts: 5 Advanced Combination Drills",
    description: "Take your heavy bag training beyond basic 1-2 punches. Learn how to work the body, execute roll-outs, and throw high-percentage combinations like the jab-cross-hook-uppercut while maintaining head movement and proper hip rotation.",
    category: "boxing",
    youtubeId: "6zpL-y4N-n8",
    thumbnail: "https://images.pexels.com/photos/4761324/pexels-photo-4761324.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "12:15",
    views: "22.8K",
    date: "2025-05-11"
  },
  {
    slug: "defensive-slipping-masterclass",
    title: "Defensive Slip, Duck & Roll Mastery for Boxers",
    description: "Slipping punches cleanly is the hallmark of an elite boxer. This tutorial outlines the exact chest and head alignment needed to slip jabs and crosses, duck under hooks, and roll out of corners to put yourself in the perfect position for devastating counterpunches.",
    category: "boxing",
    youtubeId: "3FRG52s_Vig",
    thumbnail: "https://images.pexels.com/photos/6212958/pexels-photo-6212958.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "10:42",
    views: "18.6K",
    date: "2025-05-08"
  },
  {
    slug: "perfecting-the-jab-mechanics",
    title: "The Perfect Jab: Speed, Power & Snapping Mechanics",
    description: "The jab is the ultimate setup tool. Learn how to snap your elbow, rotate your lead knuckle, step with your lead foot, and keep your guard hand secure to throw a fast, blinding jab that controls distance and disrupts your opponent's timing.",
    category: "boxing",
    youtubeId: "5RsknBf2KLA",
    thumbnail: "https://images.pexels.com/photos/6212970/pexels-photo-6212970.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "8:50",
    views: "34.1K",
    date: "2025-05-02"
  },
  {
    slug: "counter-fighting-traps",
    title: "Art of Counter-punching: Setting Traps & Timing",
    description: "Counter-punching relies on baits, tells, and traps. Coach explains how to slide off-center, parry jab lines, and throw counter-right hands. We analyze elite fights to show you how to read your opponent's body language.",
    category: "boxing",
    youtubeId: "yv10Cqg9Y_w",
    thumbnail: "https://images.pexels.com/photos/4761783/pexels-photo-4761783.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "14:05",
    views: "11.9K",
    date: "2025-04-28"
  },
  {
    slug: "shadowboxing-like-pro",
    title: "Shadowboxing: Visualizing & Simulating Real Fights",
    description: "Shadowboxing shouldn't just be moving your hands. Learn how to visualize a real opponent, slip invisible punches, cut off the ring, work on defensive pivots, and pace yourself as if you were in an actual 3-minute round.",
    category: "boxing",
    youtubeId: "V1d2XwZ5q0I",
    thumbnail: "https://images.pexels.com/photos/4761362/pexels-photo-4761362.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "11:30",
    views: "29.4K",
    date: "2025-04-22"
  },
  {
    slug: "speed-bag-rhythm-drills",
    title: "Speed Bag Fundamentals: Rhythm & Hand-Eye Coordination",
    description: "Unlock the secrets of the speed bag. Many struggle with the timing, but this tutorial breaks down the triplet rebound rhythm, open-palm technique, and simple wrist adjustments to build seamless endurance and hand speed.",
    category: "boxing",
    youtubeId: "d3vG_17c76U",
    thumbnail: "https://images.pexels.com/photos/4761330/pexels-photo-4761330.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "7:45",
    views: "9.3K",
    date: "2025-04-18"
  },
  {
    slug: "inside-fighting-dirty-boxing",
    title: "Inside Fighting Tactics: Infighting & Dirty Boxing",
    description: "When the space closes, the fight changes. Learn how to position your forehead, use your shoulders to create leverage, secure underhooks, throw short uppercuts, and punch on the break in close-quarters combat safely.",
    category: "boxing",
    youtubeId: "6zpL-y4N-n8", // reuse for high quality
    thumbnail: "https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "10:15",
    views: "14.7K",
    date: "2025-04-10"
  },
  {
    slug: "southpaw-vs-orthodox-strategy",
    title: "Tactical Guide: Southpaw vs. Orthodox Matchups",
    description: "The battle of the lead feet! Learn the critical lead foot placement, the rear hand straight lane, right hook traps, and defensive adjustments necessary when a left-hander faces a right-hander inside the squared circle.",
    category: "boxing",
    youtubeId: "3FRG52s_Vig",
    thumbnail: "https://images.pexels.com/photos/6212962/pexels-photo-6212962.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "13:20",
    views: "16.1K",
    date: "2025-04-03"
  },

  // --- GYM TRAINING (9 videos) ---
  {
    slug: "boxing-strength-power-workout",
    title: "Fighter Strength: Building Explosive Punching Power",
    description: "A comprehensive weightroom routine engineered for combat athletes. Focus on heavy compound movements like deadlifts, medicine ball throws, landmine presses, and trap bar jumps designed to optimize kinetic transfer and punch power.",
    category: "gym",
    youtubeId: "a3z9E9R-k4Q",
    thumbnail: "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "15:40",
    views: "24.5K",
    date: "2025-05-15"
  },
  {
    slug: "plyometrics-footwork-speed",
    title: "Plyometric Training: Maximize Explosive Speed & Footwork",
    description: "Build rapid foot speed and elastic force. This plyometric routine focuses on depth jumps, lateral bounds, tuck jumps, and hurdle drills that prime your fast-twitch muscle fibers for instantaneous ring movement.",
    category: "gym",
    youtubeId: "5RsknBf2KLA",
    thumbnail: "https://images.pexels.com/photos/3775544/pexels-photo-3775544.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "11:10",
    views: "19.3K",
    date: "2025-05-12"
  },
  {
    slug: "core-stability-boxers-abs",
    title: "Core Stability for Boxers: Generating Power from the Center",
    description: "Planks won't build rotational power. Learn how to train your obliques, transverse abdominis, and lower back using cable woodchoppers, heavy medicine ball slams, and Russian twists to generate punching force and absorb body shots.",
    category: "gym",
    youtubeId: "V_Jg5-y-6c0",
    thumbnail: "https://images.pexels.com/photos/4761362/pexels-photo-4761362.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "8:12",
    views: "31.2K",
    date: "2025-05-06"
  },
  {
    slug: "neck-traps-conditioning",
    title: "Punch Resistance: Neck & Trap Conditioning Guide",
    description: "A strong neck absorbs punch impact and prevents concussions. Learn how to safely perform neck extensions, isometric holds, shrugs, and resistance band routines to construct armor around your jaw and head.",
    category: "gym",
    youtubeId: "6zpL-y4N-n8",
    thumbnail: "https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "7:55",
    views: "8.6K",
    date: "2025-04-30"
  },
  {
    slug: "calisthenics-fighter-endurance",
    title: "Bodyweight Calisthenics Circuit for Fighter Stamina",
    description: "No weights? No problem. This high-octane calisthenics routine uses pull-ups, push-up variations, burpees, and air squats inside a timed circuit structure to maximize muscular endurance, shoulder stamina, and athletic coordination.",
    category: "gym",
    youtubeId: "3FRG52s_Vig",
    thumbnail: "https://images.pexels.com/photos/4761359/pexels-photo-4761359.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "13:45",
    views: "15.4K",
    date: "2025-04-25"
  },
  {
    slug: "medicine-ball-rotation-drills",
    title: "Medicine Ball Drills: Explosive Torque & Rotation",
    description: "Punching is rotational torque. Master the rotational ball throw, wall chest pass, and slam to bridge the gap between gym weight training and explosive ring performance. Essential for punch mechanics.",
    category: "gym",
    youtubeId: "yv10Cqg9Y_w",
    thumbnail: "https://images.pexels.com/photos/4761330/pexels-photo-4761330.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "10:30",
    views: "17.2K",
    date: "2025-04-20"
  },
  {
    slug: "kettlebell-conditioning-chain",
    title: "Fighter Kettlebell Workouts: Bulletproofing the Posterior Chain",
    description: "Unlock kettlebell swings, cleans, snatches, and Turkish get-ups to forge unbreakable shoulder stability, explosive hip snap, and rock-solid endurance. Complete with reps, sets, and rest guides.",
    category: "gym",
    youtubeId: "V1d2XwZ5q0I",
    thumbnail: "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "12:50",
    views: "11.1K",
    date: "2025-04-15"
  },
  {
    slug: "deadlift-technique-safety",
    title: "Deadlifting for Boxers: Safe & Powerful Hip Extension",
    description: "deadlifts build the absolute foundation of lower body power. Coach breaks down the differences between Romanian, sumo, and conventional deadlifts for fighters, explaining how to lift safely without fatiguing your nervous system.",
    category: "gym",
    youtubeId: "a3z9E9R-k4Q",
    thumbnail: "https://images.pexels.com/photos/4761324/pexels-photo-4761324.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "14:15",
    views: "21.6K",
    date: "2025-04-09"
  },
  {
    slug: "shoulder-endurance-guard",
    title: "Fighter Shoulders: Keep Your Guard High for 12 Rounds",
    description: "Tired shoulders drop guard and get you knocked out. Learn specific dumbbell, resistance band, and plate raise holds designed specifically to increase local muscular endurance in the deltoids for extended fights.",
    category: "gym",
    youtubeId: "6zpL-y4N-n8",
    thumbnail: "https://images.pexels.com/photos/6212958/pexels-photo-6212958.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "9:10",
    views: "14.2K",
    date: "2025-04-01"
  },

  // --- FITNESS TRAINING (8 videos) ---
  {
    slug: "cardio-boxing-hiit-burn",
    title: "30-Minute Intense Cardio Boxing HIIT Workout",
    description: "Sweat, burn, and conditioning. This high-intensity cardio boxing routine guides you through shadowboxing intervals, jumping jacks, burpees, and speed bag punches in an explosive home-friendly format.",
    category: "fitness",
    youtubeId: "n8V_nK-8vBg",
    thumbnail: "https://images.pexels.com/photos/3775544/pexels-photo-3775544.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "30:00",
    views: "52.7K",
    date: "2025-05-16"
  },
  {
    slug: "fat-burn-cardio-box",
    title: "Fat Burning Boxing Routine: Sweat & Shred 500 Calories",
    description: "Turn up the heat! A continuous pace boxing conditioning session that blends high-volume punch output, fast footwork drills, and core movements. No equipment needed—just 100% effort and focus.",
    category: "fitness",
    youtubeId: "V_Jg5-y-6c0",
    thumbnail: "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "25:40",
    views: "41.9K",
    date: "2025-05-13"
  },
  {
    slug: "jump-rope-endurance-rhythm",
    title: "Jump Rope Mastery: Speed, Boxer Rhythm & Stamina",
    description: "The jump rope is a boxer's closest friend. Learn how to do the boxer skip, crossovers, double unders, and high knees to build elite calf endurance, cardiorespiratory health, and overall agility.",
    category: "fitness",
    youtubeId: "n8V_nK-8vBg",
    thumbnail: "https://images.pexels.com/photos/4761359/pexels-photo-4761359.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "10:05",
    views: "68.3K",
    date: "2025-05-10"
  },
  {
    slug: "agility-ladder-foot-speed",
    title: "Agility Ladder Drills for Speedy Footwork & Stamina",
    description: "Agility ladder routines target fast footwork, motor coordination, and cardio stamina. Learn 10 key ladder patterns including the in-and-out, Ickey shuffle, and lateral hops to improve your reflexes.",
    category: "fitness",
    youtubeId: "5RsknBf2KLA",
    thumbnail: "https://images.pexels.com/photos/4761362/pexels-photo-4761362.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "11:50",
    views: "18.2K",
    date: "2025-05-04"
  },
  {
    slug: "heavy-bag-cardio-circuits",
    title: "Heavy Bag Cardio Circuits: 8 Rounds of Nonstop Action",
    description: "Melt fat and build serious stamina. This continuous heavy bag circuit structured into 8 rounds simulates real fight stress. Mix speed drills, body power strikes, and constant movement for the ultimate calorie burn.",
    category: "fitness",
    youtubeId: "6zpL-y4N-n8",
    thumbnail: "https://images.pexels.com/photos/4761324/pexels-photo-4761324.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "24:15",
    views: "29.1K",
    date: "2025-04-26"
  },
  {
    slug: "reflex-ball-coordination",
    title: "Boxer Reflex Ball: Improve Hand-Eye Coordination & Agility",
    description: "The reflex ball is the perfect portable tool for coordination. Coach teaches you how to establish a rhythm, throw straight punches, slip the return rebound, and maintain consistent foot movement while looking at the ball.",
    category: "fitness",
    youtubeId: "V1d2XwZ5q0I",
    thumbnail: "https://images.pexels.com/photos/6212970/pexels-photo-6212970.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "8:35",
    views: "15.6K",
    date: "2025-04-20"
  },
  {
    slug: "boxing-conditioning-bodyweight",
    title: "Ultimate Boxing Conditioning: Bodyweight Agility Circuit",
    description: "No weights, just non-stop fighter training. Jump, punch, duck, and crawl in a dynamic full-body agility circuit designed to build muscular power, core strength, and lung capacity for general fitness enthusiasts.",
    category: "fitness",
    youtubeId: "3FRG52s_Vig",
    thumbnail: "https://images.pexels.com/photos/6212958/pexels-photo-6212958.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "18:20",
    views: "23.4K",
    date: "2025-04-12"
  },
  {
    slug: "low-impact-boxing-fitness",
    title: "Low-Impact Cardio Boxing: Joint-Friendly Workout",
    description: "A highly effective, joint-friendly cardio boxing session. Perfect for beginners, active recovery days, or older adults, focusing on shadowboxing, light footwork, stretching, and stability exercises.",
    category: "fitness",
    youtubeId: "a3z9E9R-k4Q",
    thumbnail: "https://images.pexels.com/photos/3775544/pexels-photo-3775544.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "20:10",
    views: "12.8K",
    date: "2025-04-05"
  }
];

export function getVideosByCategory(category: 'gym' | 'boxing' | 'fitness'): Video[] {
  return videos.filter((v) => v.category === category);
}

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find((v) => v.slug === slug);
}

export function getRelatedVideos(video: Video, limit: number = 4): Video[] {
  return videos
    .filter((v) => v.category === video.category && v.slug !== video.slug)
    .slice(0, limit);
}
