\`\`\`markdown
# ✨ Todo Universe - Stunning 3D Animated Todo App

A beautiful, feature-rich todo application with stunning animations, 3D effects, and modern UI design. Built with Next.js, TypeScript, Framer Motion, and Tailwind CSS.

![Todo Universe](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## 🚀 Features

### ✨ **Visual Excellence**
- **Stunning Animations** - Smooth Framer Motion animations throughout
- **3D Effects** - Floating orbs, perspective transforms, and depth effects
- **Glassmorphism Design** - Beautiful backdrop blur and transparency effects
- **Gradient Animations** - Dynamic color transitions and flowing gradients
- **Responsive Design** - Perfect on all devices from mobile to desktop

### 📱 **Mobile Optimized**
- **Touch-Friendly Interface** - Optimized for mobile interactions
- **Floating Action Button** - Easy access to add todos on mobile
- **Responsive Layouts** - Adapts beautifully to all screen sizes
- **Performance Optimized** - Smooth animations on mobile devices

### 🎯 **Core Functionality**
- **Add/Edit/Delete Todos** - Full CRUD operations with smooth animations
- **Priority System** - Low, Medium, High priority with color coding
- **Checkbox Tracking** - Satisfying completion animations
- **Local Storage** - Automatic data persistence
- **Real-time Clock** - Beautiful animated time and date display

### 🔔 **Advanced Features**
- **Reminder System** - Set reminders with browser notifications
- **Progress Tracking** - Visual completion counters and badges
- **Inline Editing** - Edit todos directly in place
- **Keyboard Shortcuts** - Press Enter to quickly add todos
- **Notification Permissions** - Smart reminder notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Storage**: Browser Local Storage

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/adenueltech/todotodo.git
   cd todotodo
\`\`\`

2. **Install dependencies**

\`\`\`shellscript
npm install
# or
yarn install
# or
pnpm install
\`\`\`


3. **Run the development server**

\`\`\`shellscript
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`


4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)


## 🎨 Design Features

### **Animation Highlights**

- **Floating Orbs** - Animated background elements
- **Spring Animations** - Bouncy, natural feeling interactions
- **Staggered Animations** - Sequential loading of todo items
- **Hover Effects** - 3D transforms and color transitions
- **Micro-interactions** - Delightful feedback on every action


### **Color Palette**

- **Primary**: Purple to Cyan gradients
- **High Priority**: Red to Pink gradients
- **Medium Priority**: Yellow to Orange gradients
- **Low Priority**: Green to Emerald gradients


## 📱 Responsive Breakpoints

- **Mobile**: `< 640px` - Compact layout with FAB
- **Tablet**: `640px - 1024px` - Medium spacing
- **Desktop**: `> 1024px` - Full feature layout


## 🎯 Usage

### **Adding Todos**

1. Click the "Add Magic ✨" button or the floating action button on mobile
2. Enter your task title and description
3. Select priority level (Low, Medium, High)
4. Press Enter or click the button to add


### **Managing Todos**

- **Complete**: Click the circular checkbox
- **Edit**: Click the edit icon (pencil)
- **Delete**: Click the delete icon (trash)
- **Set Reminder**: Click the bell icon for 30-minute reminders


### **Features**

- **Real-time Clock**: Always shows current time and date
- **Progress Tracking**: See completion statistics at the top
- **Local Storage**: Your todos are automatically saved
- **Notifications**: Get reminded about important tasks


## 🔧 Customization

### **Changing Colors**

Edit the gradient classes in `getPriorityColor()` function:

\`\`\`typescript
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "from-red-500 to-pink-500"
    case "medium": return "from-yellow-500 to-orange-500"
    case "low": return "from-green-500 to-emerald-500"
  }
}
\`\`\`

### **Animation Timing**

Modify Framer Motion transition durations:

\`\`\`typescript
transition={{ duration: 0.8, type: "spring" }}
\`\`\`

## 🚀 Deployment

### **Vercel (Recommended)**

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically


### **Other Platforms**

\`\`\`shellscript
npm run build
npm start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Emmanuel Adewunmi (AdeNuelTech)**

- GitHub: [@adenueltech](https://github.com/adenueltech)
- Portfolio: [adenueltech.dev](https://adenueltech.dev)


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Beautiful icons


## 📸 Screenshots

### Desktop View

Beautiful glassmorphism design with floating animations

### Mobile View

Optimized mobile interface with floating action button

### Features Demo

- ✅ Real-time clock and date
- 🎯 Priority-based color coding
- 🔔 Reminder notifications
- ✨ Smooth animations
- 📱 Mobile responsive design


---

**Built with ✨ by [AdeNuelTech](https://github.com/adenueltech)**

\`\`\`plaintext

This README file includes:

✨ **Professional Structure** with clear sections
🎯 **Comprehensive Features** list
📱 **Installation Instructions** step-by-step
🛠️ **Tech Stack** details
🎨 **Design Documentation** 
📦 **Usage Guidelines**
🔧 **Customization Examples**
🚀 **Deployment Instructions**
👨‍💻 **Author Attribution** linking to your GitHub

The README is designed to be informative, visually appealing, and professional - perfect for showcas
\`\`\`
