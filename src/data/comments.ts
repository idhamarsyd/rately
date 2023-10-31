type Comment = {
  ID: string;
  komentar: string;
  film: string;
  label: number;
  klasifikasi: number;
  validasi: boolean;
  }
  
  export const comments: Comment[] = [
    {
      ID: "1",
      komentar: "Honestly, there are a lot of misconceptions going around about this film being compared to other All time great indie horror films such as “Midsommar” “The Witch, and “Hereditary”. This is not a good example of comparison. You should really not compare any of these, as all A24 horror is spread out differently amongst ridiculously talented filmmakers. ",
      film: "Talk To Me",
      label: 1,
      klasifikasi: 1,
      validasi: true,
    },
    {
      ID: "2",
      komentar: `Talk to Me" isn't just a movie; it's an otherworldly journey that immerses you in a realm of unrelenting terror and profound introspection. A chilling masterpiece directed by the visionary Philippou brothers, this film reignites the horror genre with a searing intensity reminiscent of its illustrious predecessors. In fact, it's the first film since "Hereditary" to bear the A24 stamp and unequivocally surpass all expectations, leaving an indelible mark on the cinematic landscape.`,
      film: "Talk To Me",
      label: 1,
      klasifikasi: 1,
      validasi: true,
    },
    
    // ...
  ]
  