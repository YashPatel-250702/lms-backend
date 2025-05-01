export interface Quiz {
    quiz_id?: string;
    module_id: string;
    quiz_name: string;
    duration: string;
    number_of_questions: number;
    created_at?: Date;
    updated_at?: Date;
  }
  