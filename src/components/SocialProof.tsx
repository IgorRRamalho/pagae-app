import React from "react";

// Dentro do seu componente Landing ou Hero
export const SocialProof = () => {
    const socialProofs = [
        { text: 'Já evitamos 8,765 brigas em churrascos 🍖', emoji: '🔥' },
        { text: 'Mais de 1k de amizades salvas 💔→❤️', emoji: '✂️' },
        { text: 'R$ 2,3mi em dívidas lembradas 💸', emoji: '👻' },
        { text: '537 namoros não terminados por causa de dívidas 💘', emoji: '😅' },
        { text: '214k de pizzas divididas sem estresse 🍕', emoji: '🍴' },
        { text: '99,9% de eficácia contra "esqueci minha carteira" 🧠', emoji: '🎯' },
        { text: 'Já resolvemos 42k de tretas de WhatsApp 📱', emoji: '🙉' },
        { text: '+5k grupos usando sem ninguém se bloquear 😎', emoji: '🛡️' },
        { text: '1.001 desculpas esfarrapadas detectadas 🕵️', emoji: '🧐' },
        { text: '2.314 contas de bar fechadas sem discórdia 🍻', emoji: '📊' },
        { text: '4.817 pessoas salvas de caô na vaquinha do rolê 🤝', emoji: '💵' },
        { text: '28.765 trocos certos, sem aquele "depois eu te pago" 🧾', emoji: '✅' },
        { text: '3.209 amigos promovidos a “parça confiável” 🤜🤛', emoji: '🏆' },
        { text: '12.984 boletos pagos antes de vir a cobrança 😨', emoji: '📅' },
        { text: '7.643 rolês mantidos vivos sem caloteiros 🚀', emoji: '🎉' },
        { text: '453 “só vou tomar água” desmascarados 🍾', emoji: '🕶️' },
        { text: '17.222 grupos sem aquele “paga no Pix depois” fantasioso 💳', emoji: '🤥' },
        { text: '832 amizades recuperadas depois do “quem pagou a mais?” 💰', emoji: '🔄' },
        { text: '1.203 contas divididas sem precisar usar calculadora 🧮', emoji: '🤯' }
    ];
    

    const randomIndex = Math.floor(Math.random() * socialProofs.length);
    const randomProof = socialProofs[randomIndex];

    return (
        <div className="mt-4 flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <div className="h-px w-8 bg-current opacity-30" />
            <div className="flex text-center items-center gap-2">
                <span >{randomProof.emoji}</span>
                {randomProof.text}
            </div>
            <div className="h-px w-8 bg-current opacity-30" />
        </div>
    );
};

