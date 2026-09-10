import { ProjectItem, ArticleItem, SkillItem } from '../types';

export const PERSONAL_INFO = {
  name: "Nguyễn Viết Hiếu",
  handle: "harryitz",
  tagline: "Full-Stack Developer & Freelancer",
  team: {
    name: "@TwoTech",
    url: "https://2tech.studio",
    label: "2tech.studio"
  },
  education: {
    school: "Trường Đại học Công Thương TP. Hồ Chí Minh",
    shortSchool: "HUIT",
    englishName: "Ho Chi Minh City University of Industry and Trade",
    major: "Công nghệ thông tin (Information Technology)"
  },
  focus: [
    {
      title: "Clean APIs",
      desc: "Thiết kế API tinh gọn, chuẩn RESTful, an toàn, dễ bảo trì và có tài liệu rõ ràng.",
      icon: "Code2"
    },
    {
      title: "Practical UI",
      desc: "Giao diện tối giản, trực quan, tốc độ phản hồi cao và chú trọng trải nghiệm người dùng thực tế.",
      icon: "Layout"
    },
    {
      title: "Fast Debugging",
      desc: "Khoanh vùng vấn đề nhanh, đọc log chuẩn xác, tối ưu hóa thời gian xử lý sự cố.",
      icon: "Bug"
    }
  ],
  offlineMode: [
    {
      label: "Reading",
      icon: "BookOpen",
      desc: "Sách công nghệ, tài liệu kiến trúc phần mềm và những mẩu chuyện đời sống."
    },
    {
      label: "Gaming",
      icon: "Gamepad2",
      desc: "Minecraft, game indie sandbox và những trò chơi kích thích tư duy."
    },
    {
      label: "Sleeping",
      icon: "Moon",
      desc: "Nạp lại năng lượng sau những đêm dài tối ưu thuật toán."
    },
    {
      label: "Cats 🐱",
      icon: "Cat",
      desc: "Đồng nghiệp 4 chân luôn đồng hành bên cạnh bàn làm việc."
    }
  ],
  socials: {
    facebook: {
      url: "https://www.facebook.com/harryitz.fb/",
      display: "facebook.com/harryitz.fb"
    },
    email: {
      address: "harryitz@duck.com",
      display: "harryitz@duck.com"
    },
    phone: {
      number: "0335085080",
      display: "0335 085 080"
    },
    github: {
      url: "https://github.com/0xliam627",
      display: "github.com/0xliam627"
    },
    leetcode: {
      url: "https://leetcode.com/u/harryitz/",
      display: "leetcode.com/u/harryitz"
    },
    website: "https://harryitz.me"
  },
  hometown: "Đắk Lắk, Việt Nam",
  currentCity: "TP. Hồ Chí Minh",
  location: "Đắk Lắk, Việt Nam",
  birthYear: 2008,
  quote: "Biết từ chối người khác là cách yêu thương chính mình.",
  story: "Tôi sinh năm 2008 và lớn lên tại Đắk Lắk trong một gia đình làm nông. Khởi đầu từ chiếc Samsung Galaxy J2 Prime của mẹ để dựng server Minecraft PocketMine-MP, sự tò mò đã đưa tôi đến với thế giới lập trình. Mong muốn giải quyết những vấn đề thực tế đã biến sở thích thành con đường nghề nghiệp mà tôi kiên định theo đuổi."
};

export const LEETCODE_STATS = {
  username: "harryitz",
  profileUrl: "https://leetcode.com/u/harryitz/",
  totalSolved: 16,
  easy: 11,
  medium: 5,
  hard: 0,
};

export const SKILLS_LIST: SkillItem[] = [
  { name: "PHP", level: "Senior / Core", category: "Languages" },
  { name: "JavaScript / TypeScript", level: "Advanced", category: "Languages" },
  { name: "Python", level: "Advanced", category: "Languages" },
  { name: "React / Vite", level: "Advanced", category: "Frontend" },
  { name: "Tailwind CSS", level: "Advanced", category: "Frontend" },
  { name: "Framer Motion", level: "Intermediate", category: "Frontend" },
  { name: "Three.js / Canvas", level: "Intermediate", category: "Frontend" },
  { name: "Node.js / Express", level: "Advanced", category: "Backend" },
  { name: "RESTful APIs", level: "Senior / Core", category: "Backend" },
  { name: "PostgreSQL", level: "Advanced", category: "Databases" },
  { name: "MySQL", level: "Advanced", category: "Databases" },
  { name: "MongoDB", level: "Intermediate", category: "Databases" },
  { name: "Git & GitHub", level: "Advanced", category: "Tools" },
  { name: "Linux / Ubuntu Server", level: "Advanced", category: "Tools" },
  { name: "Docker", level: "Intermediate", category: "Tools" }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "thpt-cockpit",
    title: "THPT Cockpit",
    category: "Web App",
    tagline: "Hệ sinh thái tra cứu điểm thi, xem học bạ, gợi ý trường Đại học và theo dõi xét tuyển 2026.",
    description: "Bộ công cụ toàn diện hỗ trợ học sinh chuẩn bị vào đại học: tra cứu điểm thi, xem học bạ, tính điểm xét tốt nghiệp và các khối thi đại học theo quy chế mới.",
    fullStory: "Thông tin thi cử và xét tuyển đại học thường phân tán trên nhiều cổng thông tin khác nhau, trong khi học sinh và phụ huynh phải tính toán điểm xét tuyển thủ công rất dễ nhầm lẫn. THPT Cockpit ra đời để giải quyết triệt để bài toán này với giao diện trực quan, tốc độ xử lý tức thì và cam kết bảo mật dữ liệu cá nhân.",
    downloadsCount: "Releases",
    downloadUrl: "https://github.com/0xliam627/THPTCockpit/releases",
    githubUrl: "https://github.com/0xliam627/THPTCockpit",
    liveUrl: "https://github.com/0xliam627/THPTCockpit",
    tags: ["TypeScript", "React", "Tailwind CSS"],
    status: "Đang phát triển",
    features: [
      "Tự động tính điểm thi tốt nghiệp THPT theo quy chế Bộ GD&ĐT",
      "Tính điểm các tổ hợp xét tuyển A00, A01, B00, C00, D01... có tính điểm ưu tiên",
      "Tra cứu nhanh học bạ và số liệu xét tuyển cá nhân",
      "Gợi ý thông tin ngành học và quản lý minh chứng xét tuyển bảo mật"
    ],
    featured: true
  },
  {
    id: "sitedrift",
    title: "SiteDrift",
    category: "Browser Extension",
    tagline: "Tự động bỏ qua các trang rút gọn link gây phiền toái.",
    description: "Don't waste your time with compliance. SiteDrift automatically skips annoying link shorteners.",
    fullStory: "Tiện ích mở rộng trình duyệt giúp người dùng tiết kiệm thời gian, tự động nhận diện và vượt qua các trang rút gọn link quảng cáo để đưa bạn thẳng tới đích an toàn.",
    downloadsCount: "v26.0.1",
    downloadUrl: "https://github.com/two-tech-dev/SiteDrift/releases",
    githubUrl: "https://github.com/two-tech-dev/SiteDrift",
    liveUrl: "https://sitedrift.2tech.studio/",
    tags: ["TypeScript", "Browser Extension", "Chromium", "Firefox"],
    status: "v26.0.1",
    features: [
      "Tự động giải mã và chuyển tiếp link đích",
      "Hỗ trợ cả Chromium (Chrome, Edge, Brave...) và Firefox",
      "Bảo vệ người dùng khỏi popup độc hại và quảng cáo trung gian"
    ],
    featured: true
  }
];

export const ARTICLES: ArticleItem[] = [
  {
    id: "pmmp-ngung-phat-trien",
    title: "PMMP ngừng phát triển, còn tôi đã bắt đầu từ đó",
    date: "11 tháng 7, 2026",
    readTime: "6 phút đọc",
    tag: "Hành trình Dev",
    dek: "Một chiếc điện thoại cũ, một máy chủ Minecraft và con đường tôi chưa từng nghĩ mình sẽ đi.",
    quote: "Cảm ơn PocketMine-MP. Cảm ơn vì đã vô tình dẫn tôi đến con đường mình đang đi.",
    featured: true,
    content: [
      "Ngày 11/7/2026, dktapps thông báo ngừng phát triển PocketMine-MP. Tôi không biết nên bắt đầu nói về tin này như thế nào, nên có lẽ phải kể về mình trước.",
      "Trước đây, tôi chưa từng nghĩ cuộc đời mình sẽ liên quan đến công nghệ thông tin. Hồi tiểu học, tôi rất thích toán và từng nghĩ sau này mình sẽ tiếp tục theo đuổi môn học đó.",
      "Rồi đến năm lớp 4, lớp 5, tôi nghiện dùng điện thoại hơn bao giờ hết. Tôi chơi Minecraft và muốn tự tạo một máy chủ riêng. Thế là tôi cài PocketMine-MP trên chiếc Samsung Galaxy J2 Prime của mẹ.",
      "Lúc đó, tôi chẳng hiểu code là gì. May mắn là tôi quen được một vài người bạn, anh, chị qua mạng. Mỗi khi gặp lỗi hoặc không biết phải làm gì tiếp theo, tôi lại nhờ họ giúp đỡ. Có lẽ nếu không gặp những người ấy, tôi đã bỏ cuộc từ lâu.",
      "Nhưng không hiểu sao, đến gần cuối năm lớp 5, tôi bắt đầu đọc được những đoạn code mà trước đó mình chỉ biết sao chép. Có lẽ vì copy-paste quá nhiều nên tôi dần nhận ra mỗi dòng dùng để làm gì. Nghe hơi ngớ ngẩn, nhưng tôi đã học code theo cách như vậy.",
      "Từ một đứa chỉ muốn mở máy chủ Minecraft, tôi bắt đầu thích lập trình. Cứ thế, tôi gắn bó với nó cho đến tận bây giờ và đang chuẩn bị theo học ngành công nghệ thông tin tại đại học. Uầy, nghĩ lại vẫn thấy khó hiểu thật.",
      "PMMP đã đưa tôi đến với những dòng code đầu tiên. Nhờ nó, tôi biết cảm giác vui đến mức nào khi tự tay làm ra một thứ rồi nhìn thấy nó hoạt động, dù khi ấy tôi còn chẳng biết việc mình đang làm được gọi là lập trình.",
      "Vì vậy, tin PMMP ngừng phát triển khiến tôi hơi buồn. Với nhiều người, nó có thể chỉ là một phần mềm dùng để tạo máy chủ Minecraft. Với tôi, nó là nơi mọi chuyện bắt đầu."
    ]
  }
];
