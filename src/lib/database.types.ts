// Generated types for Supabase schema.
// In production, regenerate with: npx supabase gen types typescript --local > src/lib/database.types.ts
// This hand-written version matches supabase/migrations/00001_initial_schema.sql

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      life_areas: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          color: string;
          icon: string;
          order: number;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          name: string;
          color: string;
          icon: string;
          order?: number;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          color?: string;
          icon?: string;
          order?: number;
          is_default?: boolean;
          created_at?: string;
        };
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          life_area_id: string | null;
          title: string;
          description: string;
          type: 'long-term' | 'monthly' | 'weekly';
          target_date: string | null;
          status: 'active' | 'completed' | 'archived';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          life_area_id?: string | null;
          title: string;
          description?: string;
          type: 'long-term' | 'monthly' | 'weekly';
          target_date?: string | null;
          status?: 'active' | 'completed' | 'archived';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          life_area_id?: string | null;
          title?: string;
          description?: string;
          type?: 'long-term' | 'monthly' | 'weekly';
          target_date?: string | null;
          status?: 'active' | 'completed' | 'archived';
          created_at?: string;
        };
      };
      daily_plans: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          top_priorities: Json;
          schedule: Json;
          primary_tasks: Json;
          secondary_tasks: Json;
          notes: string;
          review: Json;
          mood: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          date: string;
          top_priorities?: Json;
          schedule?: Json;
          primary_tasks?: Json;
          secondary_tasks?: Json;
          notes?: string;
          review?: Json;
          mood?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          top_priorities?: Json;
          schedule?: Json;
          primary_tasks?: Json;
          secondary_tasks?: Json;
          notes?: string;
          review?: Json;
          mood?: Json;
          created_at?: string;
        };
      };
      weekly_plans: {
        Row: {
          id: string;
          user_id: string;
          week_start: string;
          last_week_review: Json;
          top_priorities: Json;
          weekly_plan: Json;
          notes: string;
          life_area_goals: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          week_start: string;
          last_week_review?: Json;
          top_priorities?: Json;
          weekly_plan?: Json;
          notes?: string;
          life_area_goals?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          week_start?: string;
          last_week_review?: Json;
          top_priorities?: Json;
          weekly_plan?: Json;
          notes?: string;
          life_area_goals?: Json;
          created_at?: string;
        };
      };
      monthly_plans: {
        Row: {
          id: string;
          user_id: string;
          month: number;
          year: number;
          goals: Json;
          notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          month: number;
          year: number;
          goals?: Json;
          notes?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          month?: number;
          year?: number;
          goals?: Json;
          notes?: string;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          date: string;
          start_time: string | null;
          end_time: string | null;
          life_area_id: string | null;
          notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          title: string;
          date: string;
          start_time?: string | null;
          end_time?: string | null;
          life_area_id?: string | null;
          notes?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          date?: string;
          start_time?: string | null;
          end_time?: string | null;
          life_area_id?: string | null;
          notes?: string;
          created_at?: string;
        };
      };
      habits: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          type: 'boolean' | 'quantity' | 'timed';
          target: number | null;
          unit: string | null;
          schedule: Json;
          life_area_id: string | null;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          name: string;
          description?: string;
          type: 'boolean' | 'quantity' | 'timed';
          target?: number | null;
          unit?: string | null;
          schedule?: Json;
          life_area_id?: string | null;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string;
          type?: 'boolean' | 'quantity' | 'timed';
          target?: number | null;
          unit?: string | null;
          schedule?: Json;
          life_area_id?: string | null;
          color?: string;
          created_at?: string;
        };
      };
      habit_completions: {
        Row: {
          id: string;
          user_id: string;
          habit_id: string;
          date: string;
          value: number;
          timestamp: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          habit_id: string;
          date: string;
          value?: number;
          timestamp?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          habit_id?: string;
          date?: string;
          value?: number;
          timestamp?: string;
        };
      };
      user_data: {
        Row: {
          id: string;
          user_id: string;
          xp: number;
          level: number;
          achievements: Json;
          streak_freezes: number;
          settings: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          xp?: number;
          level?: number;
          achievements?: Json;
          streak_freezes?: number;
          settings?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          xp?: number;
          level?: number;
          achievements?: Json;
          streak_freezes?: number;
          settings?: Json;
          created_at?: string;
        };
      };
      ai_conversations: {
        Row: {
          id: string;
          user_id: string;
          messages: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          messages?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          messages?: Json;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
