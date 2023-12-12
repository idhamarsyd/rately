type Comment = {
  id: number;
  comment: string;
  movie: number;
  label: "POSITIVE" | "NEGATIVE";
};

export const comments: Comment[] = [
  {
    id: 1,
    comment:
      "Honestly, there are a lot of misconceptions going around about this film being compared to other All time great indie horror films such as “Midsommar” “The Witch, and “Hereditary”. This is not a good example of comparison. You should really not compare any of these, as all A24 horror is spread out differently amongst ridiculously talented filmmakers. ",
    movie: 1,
    label: "POSITIVE",
  },
  {
    id: 2,
    comment: `Talk to Me" isn't just a movie; it's an otherworldly journey that immerses you in a realm of unrelenting terror and profound introspection. A chilling masterpiece directed by the visionary Philippou brothers, this film reignites the horror genre with a searing intensity reminiscent of its illustrious predecessors. In fact, it's the first film since "Hereditary" to bear the A24 stamp and unequivocally surpass all expectations, leaving an indelible mark on the cinematic landscape.`,
    movie: 2,
    label: "NEGATIVE",
  },

  // ...
];
