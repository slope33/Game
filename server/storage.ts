import { type User, type InsertUser, type QuizQuestion, type InsertQuizQuestion, type QuizAttempt, type InsertQuizAttempt } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getQuizQuestions(difficulty?: string, category?: string): Promise<QuizQuestion[]>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  saveQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizQuestions: Map<string, QuizQuestion>;
  private quizAttempts: Map<string, QuizAttempt>;

  constructor() {
    this.users = new Map();
    this.quizQuestions = new Map();
    this.quizAttempts = new Map();
    this.initializeQuizData();
  }

  private initializeQuizData() {
    const questions: InsertQuizQuestion[] = [
      {
        question: "What is the capital city of Colombia?",
        answers: ["Medellín", "Cali", "Bogotá", "Cartagena"],
        correctAnswer: 3,
        icon: "🏛️",
        explanation: "Bogotá is the capital and largest city of Colombia, located in the center of the country.",
        category: "Geography",
        difficulty: "beginner"
      },
      {
        question: "Which country does NOT share a border with Colombia?",
        answers: ["Ecuador", "Peru", "Venezuela", "Chile"],
        correctAnswer: 3,
        icon: "🗺️",
        explanation: "Chile is located on the western coast of South America and does not border Colombia.",
        category: "Geography",
        difficulty: "intermediate"
      },
      {
        question: "Which city is known as the 'City of Eternal Spring'?",
        answers: ["Barranquilla", "Medellín", "Bucaramanga", "Pereira"],
        correctAnswer: 1,
        icon: "🌸",
        explanation: "Medellín is called the 'City of Eternal Spring' due to its pleasant year-round climate.",
        category: "Geography",
        difficulty: "beginner"
      },
      {
        question: "What is Colombia's most famous export?",
        answers: ["Emeralds", "Coffee", "Oil", "Flowers"],
        correctAnswer: 1,
        icon: "☕",
        explanation: "Colombia is world-renowned for its high-quality coffee, particularly Arabica beans.",
        category: "Economy",
        difficulty: "beginner"
      },
      {
        question: "Which Colombian city is a major Caribbean port?",
        answers: ["Medellín", "Bogotá", "Cartagena", "Cali"],
        correctAnswer: 2,
        icon: "⚓",
        explanation: "Cartagena is Colombia's most important Caribbean port and a popular tourist destination.",
        category: "Geography",
        difficulty: "beginner"
      },
      {
        question: "What mountain range runs through Colombia?",
        answers: ["Rockies", "Andes", "Himalayas", "Alps"],
        correctAnswer: 1,
        icon: "⛰️",
        explanation: "The Andes mountain range extends through Colombia, forming three main cordilleras.",
        category: "Geography",
        difficulty: "intermediate"
      },
      {
        question: "Which dance originated in Colombia?",
        answers: ["Tango", "Salsa", "Cumbia", "Bachata"],
        correctAnswer: 2,
        icon: "💃",
        explanation: "Cumbia is a traditional Colombian dance and music style that originated on the Caribbean coast.",
        category: "Culture",
        difficulty: "beginner"
      },
      {
        question: "What is the currency of Colombia?",
        answers: ["Dollar", "Peso", "Sol", "Bolivar"],
        correctAnswer: 1,
        icon: "💰",
        explanation: "The Colombian peso (COP) is the official currency of Colombia.",
        category: "Economy",
        difficulty: "beginner"
      },
      {
        question: "Which Colombian author won the Nobel Prize in Literature?",
        answers: ["Mario Vargas Llosa", "Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda"],
        correctAnswer: 1,
        icon: "📚",
        explanation: "Gabriel García Márquez won the Nobel Prize in Literature in 1982 for his magical realism.",
        category: "Culture",
        difficulty: "advanced"
      },
      {
        question: "What percentage of the world's emeralds come from Colombia?",
        answers: ["50%", "60%", "70%", "80%"],
        correctAnswer: 2,
        icon: "💎",
        explanation: "Colombia produces approximately 70% of the world's emeralds, particularly from Boyacá.",
        category: "Economy",
        difficulty: "intermediate"
      },
      {
        question: "Which Colombian festival is famous worldwide?",
        answers: ["Carnival of Barranquilla", "Day of the Dead", "Inti Raymi", "La Tomatina"],
        correctAnswer: 0,
        icon: "🎭",
        explanation: "The Carnival of Barranquilla is one of the largest carnival celebrations in the world.",
        category: "Culture",
        difficulty: "intermediate"
      },
      {
        question: "What is the official language of Colombia?",
        answers: ["Portuguese", "English", "Spanish", "French"],
        correctAnswer: 2,
        icon: "🗣️",
        explanation: "Spanish is the official language of Colombia, spoken by the vast majority of the population.",
        category: "Culture",
        difficulty: "beginner"
      },
      {
        question: "Which Colombian region is known for coffee production?",
        answers: ["Amazon", "Coffee Triangle", "Llanos", "Caribbean Coast"],
        correctAnswer: 1,
        icon: "🌿",
        explanation: "The Coffee Triangle (Eje Cafetero) is the heart of Colombia's coffee production.",
        category: "Geography",
        difficulty: "intermediate"
      },
      {
        question: "What is Colombia's second largest city?",
        answers: ["Cali", "Medellín", "Barranquilla", "Cartagena"],
        correctAnswer: 1,
        icon: "🏙️",
        explanation: "Medellín is Colombia's second largest city and an important industrial center.",
        category: "Geography",
        difficulty: "beginner"
      },
      {
        question: "Which ocean borders Colombia to the west?",
        answers: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correctAnswer: 2,
        icon: "🌊",
        explanation: "The Pacific Ocean borders Colombia's western coast, providing access to Asian markets.",
        category: "Geography",
        difficulty: "beginner"
      },
      {
        question: "What is the name of Colombia's national flower?",
        answers: ["Rose", "Orchid", "Carnation", "Lily"],
        correctAnswer: 1,
        icon: "🌺",
        explanation: "The Cattleya trianae orchid is Colombia's national flower, named after Colombian botanist José Jerónimo Triana.",
        category: "Culture",
        difficulty: "intermediate"
      },
      {
        question: "Which Colombian city hosted the 2011 FIFA U-20 World Cup final?",
        answers: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
        correctAnswer: 0,
        icon: "⚽",
        explanation: "Bogotá's El Campín stadium hosted the final match of the 2011 FIFA U-20 World Cup.",
        category: "Sports",
        difficulty: "advanced"
      },
      {
        question: "What is the highest peak in Colombia?",
        answers: ["Pico Cristóbal Colón", "Nevado del Ruiz", "Pico Bolívar", "Cerro Pintado"],
        correctAnswer: 0,
        icon: "🏔️",
        explanation: "Pico Cristóbal Colón in the Sierra Nevada de Santa Marta is Colombia's highest peak at 5,700 meters.",
        category: "Geography",
        difficulty: "advanced"
      }
    ];

    questions.forEach(question => {
      this.createQuizQuestion(question);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getQuizQuestions(difficulty?: string, category?: string): Promise<QuizQuestion[]> {
    let questions = Array.from(this.quizQuestions.values());
    
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    if (category) {
      questions = questions.filter(q => q.category === category);
    }
    
    return questions;
  }

  async createQuizQuestion(insertQuestion: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = randomUUID();
    const question: QuizQuestion = { 
      ...insertQuestion, 
      id,
      difficulty: insertQuestion.difficulty || "beginner",
      imageUrl: insertQuestion.imageUrl || null
    };
    this.quizQuestions.set(id, question);
    return question;
  }

  async saveQuizAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = randomUUID();
    const attempt: QuizAttempt = { ...insertAttempt, id };
    this.quizAttempts.set(id, attempt);
    return attempt;
  }
}

export const storage = new MemStorage();
