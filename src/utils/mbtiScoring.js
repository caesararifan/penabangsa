// src/utils/mbtiScoring.js

export const mbtiScoringKey = {
  1: { A: 'P', B: 'J' }, 2: { A: 'I', B: 'E' }, 3: { A: 'J', B: 'P' }, 4: { A: 'T', B: 'F' },
  5: { A: 'E', B: 'I' }, 6: { A: 'N', B: 'S' }, 7: { A: 'E', B: 'I' }, 8: { A: 'S', B: 'N' },
  9: { A: 'F', B: 'T' }, 10: { A: 'I', B: 'E' }, 11: { A: 'I', B: 'E' }, 12: { A: 'P', B: 'J' },
  13: { A: 'S', B: 'N' }, 14: { A: 'T', B: 'F' }, 15: { A: 'I', B: 'E' }, 16: { A: 'J', B: 'P' },
  17: { A: 'T', B: 'F' }, 18: { A: 'P', B: 'J' }, 19: { A: 'J', B: 'P' }, 20: { A: 'I', B: 'E' },
  21: { A: 'P', B: 'J' }, 22: { A: 'N', B: 'S' }, 23: { A: 'T', B: 'F' }, 24: { A: 'J', B: 'P' },
  25: { A: 'J', B: 'P' }, 26: { A: 'P', B: 'J' }, 27: { A: 'J', B: 'P' }, 28: { A: 'E', B: 'I' },
  29: { A: 'I', B: 'E' }, 30: { A: 'T', B: 'F' }, 31: { A: 'I', B: 'E' }, 32: { A: 'F', B: 'T' },
  33: { A: 'P', B: 'J' }, 34: { A: 'J', B: 'P' }, 35: { A: 'E', B: 'I' }, 36: { A: 'I', B: 'E' },
  37: { A: 'T', B: 'F' }, 38: { A: 'I', B: 'E' }, 39: { A: 'F', B: 'T' }, 40: { A: 'P', B: 'J' },
  41: { A: 'S', B: 'N' }, 42: { A: 'T', B: 'F' }, 43: { A: 'S', B: 'N' }, 44: { A: 'P', B: 'J' },
  45: { A: 'I', B: 'E' }, 46: { A: 'S', B: 'N' }, 47: { A: 'J', B: 'P' }, 48: { A: 'T', B: 'F' },
  49: { A: 'F', B: 'T' }, 50: { A: 'P', B: 'J' }, 51: { A: 'S', B: 'N' }, 52: { A: 'E', B: 'I' },
  53: { A: 'S', B: 'N' }, 54: { A: 'J', B: 'P' }, 55: { A: 'T', B: 'F' }, 56: { A: 'J', B: 'P' },
  57: { A: 'T', B: 'F' }, 58: { A: 'T', B: 'F' }, 59: { A: 'P', B: 'J' }, 60: { A: 'P', B: 'J' }
};

export const mbtiProfiles = {
  INTJ: { name: 'The Mastermind', desc: 'Pemikir imajinatif dan strategis, selalu punya rencana untuk segala hal.', prof: 'Programmer, Analis Sistem, Ilmuwan, Arsitek.' },
  INTP: { name: 'The Logician', desc: 'Penemu inovatif dengan kehausan tak kenal lelah akan pengetahuan.', prof: 'Programmer, Ahli Matematika, Peneliti, Insinyur.' },
  ENTJ: { name: 'The Commander', desc: 'Pemimpin yang berani, imajinatif, dan tangguh, selalu menemukan cara.', prof: 'Entrepreneur, Pengacara, Pemimpin Organisasi, Analis Bisnis.' },
  ENTP: { name: 'The Debater', desc: 'Pemikir yang cerdas dan penasaran yang tidak bisa menolak tantangan intelektual.', prof: 'Pengacara, Konsultan, Politikus, Programmer.' },
  INFJ: { name: 'The Advocate', desc: 'Pendiam namun idealis dan sangat menginspirasi.', prof: 'Psikolog, Penulis, Konselor, Pekerja Sosial.' },
  INFP: { name: 'The Mediator', desc: 'Orang yang puitis, baik hati, dan altruistik, selalu ingin membantu tujuan baik.', prof: 'Penulis, Seniman, Psikolog, Guru.' },
  ENFJ: { name: 'The Protagonist', desc: 'Pemimpin yang karismatik dan menginspirasi pendengarnya.', prof: 'Konselor, Guru, HRD, Motivator.' },
  ENFP: { name: 'The Campaigner', desc: 'Berjiwa bebas, antusias, dan kreatif, selalu menemukan alasan untuk tersenyum.', prof: 'Jurnalis, Entertainer, Konsultan, Seniman.' },
  ISTJ: { name: 'The Logistician', desc: 'Individu yang praktis dan mengutamakan fakta, keandalannya tidak diragukan.', prof: 'Akuntan, Manajer, Polisi, Hakim.' },
  ISFJ: { name: 'The Defender', desc: 'Pelindung yang sangat berdedikasi dan hangat.', prof: 'Perawat, Guru, Pekerja Sosial, Administrasi.' },
  ESTJ: { name: 'The Executive', desc: 'Administrator luar biasa, ahli dalam mengelola orang atau berbagai hal.', prof: 'Manajer, Hakim, Polisi, Pebisnis.' },
  ESFJ: { name: 'The Consul', desc: 'Orang yang sangat peduli, sosial, dan populer, selalu ingin membantu.', prof: 'Guru, Perawat, HRD, Public Relations.' },
  ISTP: { name: 'The Virtuoso', desc: 'Eksperimentator yang berani dan praktis, menguasai berbagai macam alat.', prof: 'Teknisi, Mekanik, Programmer, Polisi.' },
  ISFP: { name: 'The Adventurer', desc: 'Seniman yang fleksibel dan menawan, selalu siap menjelajahi hal baru.', prof: 'Seniman, Desainer, Musisi, Fotografer.' },
  ESTP: { name: 'The Entrepreneur', desc: 'Cerdas, energik, dan sangat perseptif, selalu menikmati hidup di tepi jurang.', prof: 'Pengusaha, Marketing, Sales, Polisi.' },
  ESFP: { name: 'The Entertainer', desc: 'Orang yang spontan, energik, dan antusias.', prof: 'Entertainer, Aktor, Desainer, Public Relations.' }
};

export const calculateMBTI = (answers) => {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  // Hitung akumulasi poin
  for (const [questionId, choice] of Object.entries(answers)) {
    const dimension = mbtiScoringKey[questionId][choice];
    if (dimension) scores[dimension]++;
  }

  // Tentukan huruf dominan per dikotomi
  const type = [
    scores.E > scores.I ? 'E' : 'I',
    scores.S > scores.N ? 'S' : 'N',
    scores.T > scores.F ? 'T' : 'F',
    scores.J > scores.P ? 'J' : 'P'
  ].join('');

  return type;
};