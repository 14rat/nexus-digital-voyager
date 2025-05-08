
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import NeonButton from "./NeonButton";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const ContactWormholeSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setSubmitted(true);
      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos pelo seu contato.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-gradient">Portal de Contato</span>
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Envie sua mensagem através do nosso wormhole digital
        </p>
        
        {/* Wormhole form */}
        <div className="relative">
          {/* Visual wormhole effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-nexus-purple/30 to-nexus-blue/30 blur-md"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-200%] animate-[shimmer_3s_ease-in-out_infinite]"></div>
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)]"></div>
          </div>
          
          <div className="relative z-10 backdrop-blur-md bg-nexus-space/50 border border-gray-800 rounded-xl p-6 md:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Seu Nome
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Digite seu nome"
                      className={cn(
                        "bg-gray-900/50 border-gray-700 focus:border-nexus-cyan focus:ring-nexus-cyan/50",
                        errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      )}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Seu E-mail
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      className={cn(
                        "bg-gray-900/50 border-gray-700 focus:border-nexus-magenta focus:ring-nexus-magenta/50",
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      )}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Sua Mensagem
                  </label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      placeholder="Digite sua mensagem aqui..."
                      rows={5}
                      className={cn(
                        "bg-gray-900/50 border-gray-700 focus:border-nexus-blue focus:ring-nexus-blue/50 resize-none",
                        errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      )}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <NeonButton 
                    type="submit" 
                    neonVariant="cyan"
                    size="lg"
                    disabled={isSubmitting}
                    className="relative overflow-hidden group"
                  >
                    <span className={cn(
                      "inline-block transition-all duration-300",
                      isSubmitting && "opacity-0"
                    )}>
                      Enviar Mensagem
                    </span>
                    {isSubmitting && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <div className="h-5 w-5 rounded-full border-t-2 border-nexus-cyan animate-spin"></div>
                      </span>
                    )}
                    <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-nexus-purple via-nexus-blue to-nexus-cyan opacity-30 blur-md animate-pulse-glow"></div>
                    </span>
                  </NeonButton>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-gradient">Mensagem Enviada!</h3>
                <p className="text-gray-300 mb-6">
                  Sua mensagem foi enviada com sucesso através do nosso wormhole digital.
                  Entraremos em contato em breve!
                </p>
                <NeonButton 
                  neonVariant="magenta"
                  onClick={() => setSubmitted(false)}
                >
                  Enviar Nova Mensagem
                </NeonButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactWormholeSection;
