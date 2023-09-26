export class CreateFaqDto {
  question: string;
  answer: string;
}

export class GetFaqDtoRes {
  question: string;
  answer: string;
  id: string;
}
