import React, { useState } from 'react';
import { Plus, Eye, Download, Sparkles, Wand2, FileText, User, Briefcase, Award, Brain, Target, CheckCircle, Star } from 'lucide-react';
import { CVForm } from './CVForm';
import { AIAssistant } from './AIAssistant';
import { useOpenAI } from '../../hooks/useOpenAI';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
  atsScore: number;
}

export const CVCreator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [creationMode, setCreationMode] = useState<'template' | 'ai' | 'form' | 'assistant' | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateCVContent, isLoading } = useOpenAI();

  const templates: Template[] = [
    {
      id: '1',
      name: 'CV Professionnel',
      description: 'Design épuré et moderne, parfait pour tous secteurs d\'activité',
      preview: 'bg-gradient-to-br from-violet-100 to-pink-100',
      category: 'Professionnel',
      atsScore: 94
    },
    {
      id: '2',
      name: 'CV Créatif',
      description: 'Design créatif et original pour les métiers artistiques et créatifs',
      preview: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      category: 'Créatif',
      atsScore: 89
    },
    {
      id: '3',
      name: 'CV Minimaliste',
      description: 'Design épuré et minimaliste, focus sur le contenu essentiel',
      preview: 'bg-gradient-to-br from-pink-100 to-rose-100',
      category: 'Minimaliste',
      atsScore: 96
    },
    {
      id: '4',
      name: 'CV Technologie',
      description: 'Optimisé pour les métiers tech avec sections dédiées aux projets',
      preview: 'bg-gradient-to-br from-gray-100 to-slate-100',
      category: 'Technologie',
      atsScore: 97
    },
    {
      id: '5',
      name: 'CV Finance',
      description: 'Template professionnel pour le secteur financier et bancaire',
      preview: 'bg-gradient-to-br from-emerald-100 to-teal-100',
      category: 'Finance',
      atsScore: 95
    },
    {
      id: '6',
      name: 'CV Marketing',
      description: 'Design dynamique pour les professionnels du marketing et communication',
      preview: 'bg-gradient-to-br from-indigo-100 to-purple-100',
      category: 'Marketing',
      atsScore: 93
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-emerald-600';
    if (score >= 90) return 'text-blue-600';
    if (score >= 85) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 95) return 'from-emerald-500 to-teal-500';
    if (score >= 90) return 'from-blue-500 to-cyan-500';
    if (score >= 85) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const handleAIGeneration = async () => {
    setIsGenerating(true);
    try {
      const mockUserInfo = {
        name: 'Marie Dubois',
        currentRole: 'Développeuse Full Stack',
        currentCompany: 'TechCorp',
        skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
      };
      
      const content = await generateCVContent(mockUserInfo);
      if (content) {
        // In real app, would redirect to CV editor with generated content
        console.log('CV généré avec succès');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (creationMode === 'form') {
    return <CVForm onBack={() => setCreationMode(null)} />;
  }

  if (creationMode === 'assistant') {
    return <AIAssistant onBack={() => setCreationMode(null)} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Créateur de CV IA
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Créez un CV optimisé ATS avec notre assistant IA OpenAI. Choisissez votre approche et laissez notre intelligence artificielle vous guider.
        </p>
      </div>

      {/* AI Assistant Card */}
      <div className="bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 rounded-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span>Assistant IA Powered by OpenAI</span>
              </h3>
              <p className="text-white/90 mb-6">
                Notre IA analyse vos informations professionnelles et crée automatiquement un CV optimisé pour les systèmes ATS avec un taux de passage 94% supérieur
              </p>
              
              <button 
                onClick={() => setCreationMode('assistant')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-3 disabled:opacity-50"
                disabled={isGenerating}
              >
                <Wand2 className="w-5 h-5" />
                <span>{isGenerating ? 'Génération en cours...' : 'Commencer avec l\'IA'}</span>
              </button>
            </div>
            
            <div className="hidden lg:block">
              <Sparkles className="w-16 h-16 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Creation Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setCreationMode('ai')}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Génération IA Complete</h4>
            <p className="text-sm text-gray-600 mb-4">
              L'IA crée votre CV entier à partir de vos informations professionnelles
            </p>
            <div className="flex items-center space-x-2 text-xs text-violet-600 font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Powered by OpenAI</span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => window.location.hash = '#templates'}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-pink-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Templates Word</h4>
            <p className="text-sm text-gray-600 mb-4">
              Téléchargez nos templates Word optimisés ATS
            </p>
            <div className="flex items-center space-x-2 text-xs text-violet-600 font-medium">
              <Award className="w-3 h-3" />
              <span>Format Word (.docx)</span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setCreationMode('form')}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
              <User className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Création Guidée</h4>
            <p className="text-sm text-gray-600 mb-4">
              Remplissez notre formulaire intelligent avec assistance IA
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-600 font-medium">
              <Briefcase className="w-3 h-3" />
              <span>Guidage étape par étape</span>
            </div>
          </div>
        </button>
      </div>

      {/* Templates Section */}
      {creationMode === null && (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Sélectionnez Votre Modèle
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Choisissez un modèle pour commencer à créer votre CV ou votre lettre de motivation. 
              Filtrez par style ou par secteur d'activité pour trouver le modèle parfait.
            </p>
          </div>

          {/* Template Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Tous', 'Professionnel', 'Créatif', 'Minimaliste', 'Technologie', 'Finance', 'Marketing'].map((category, index) => (
              <button
                key={category}
                onClick={() => {/* Handle category filter */}}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === 'Tous'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedTemplate === template.id ? 'scale-105 shadow-2xl' : 'hover:scale-105'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className={`rounded-3xl transition-all duration-300 overflow-hidden shadow-xl ${
                  selectedTemplate === template.id
                    ? 'ring-4 ring-blue-300 shadow-2xl'
                    : 'hover:shadow-2xl'
                }`}>
                  {/* Template Preview */}
                  <div className={`h-96 ${template.preview} relative overflow-hidden p-6`}>
                    {/* Realistic CV Preview */}
                    <div className="bg-white rounded-lg shadow-lg w-64 mx-auto p-4 transform scale-95 hover:scale-100 transition-transform duration-300 overflow-hidden" style={{ aspectRatio: '1/1.414', height: 'auto' }}>
                      <div className="text-center mb-3 pb-2 border-b border-gray-200">
                        {/* Photo de profil */}
                        <div className="w-8 h-8 rounded-full mx-auto mb-2 overflow-hidden border-2 border-violet-200">
                          {template.category === 'Technologie' ? (
                            <img 
                              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                              alt="Tech Professional"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img 
                              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                              alt="Professional"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="font-bold text-gray-900 text-[8px] mb-1">
                          {template.category === 'Professionnel' ? 'MARIE DUBOIS' :
                           template.category === 'Créatif' ? 'CREATIVE EXPERT' :
                           template.category === 'Minimaliste' ? 'MINIMALIST' :
                           template.category === 'Technologie' ? 'TECH EXPERT' :
                           template.category === 'Finance' ? 'FINANCE PRO' :
                           'MARKETING GURU'}
                        </div>
                        <div className="text-violet-600 text-[6px] truncate font-medium">
                          {template.category === 'Professionnel' ? 'Responsable Marketing Digital' :
                           template.category === 'Créatif' ? 'Designer UX/UI Senior' :
                           template.category === 'Minimaliste' ? 'Consultant Strategy' :
                           template.category === 'Technologie' ? 'Lead Developer Full Stack' :
                           template.category === 'Finance' ? 'Directeur Financier' :
                           'Growth Marketing Manager'}
                        </div>
                      </div>
                      
                      {/* CV Sections */}
                      <div className="space-y-0.5 text-[6px]">
                        {/* Experience Section */}
                        <div>
                          <div className="text-[7px] font-semibold text-violet-700 mb-0.5 uppercase tracking-wide truncate border-b border-violet-200 pb-0.5">
                            {template.category === 'Créatif' ? 'Expérience' : 'Expérience Professionnelle'}
                          </div>
                          <div className="space-y-0.5">
                            <div className="font-medium text-gray-900 truncate text-[6px] bg-violet-50 px-1 py-0.5 rounded">
                              {template.category === 'Technologie' ? 'Lead Developer' :
                               template.category === 'Finance' ? 'Directeur Financier' :
                               template.category === 'Créatif' ? 'Senior UX Designer' :
                               'Responsable Marketing'}
                            </div>
                            <div className="text-violet-600 text-[6px] truncate">TechCorp • 2020 - Présent</div>
                            <div className="text-gray-500 text-[6px] leading-tight truncate">
                              • {template.category === 'Technologie' ? 'Architecture applications React/Node.js' :
                                  template.category === 'Finance' ? 'Gestion budget 50M€, ROI +25%' :
                                  template.category === 'Créatif' ? 'Design système utilisé par 1M+ users' :
                                  'Croissance trafic +200%, ROI 4:1'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Skills Section */}
                        <div>
                          <div className="text-[7px] font-semibold text-violet-700 mb-0.5 uppercase tracking-wide border-b border-violet-200 pb-0.5">
                            Compétences
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <div className="space-y-1 overflow-hidden">
                              {template.category === 'Technologie' ? (
                                <>
                                  <div className="text-gray-700 truncate text-[6px] bg-blue-50 px-1 rounded">• JavaScript</div>
                                  <div className="text-gray-700 truncate text-[6px] bg-blue-50 px-1 rounded">• React</div>
                                  <div className="text-gray-700 truncate text-[6px] bg-blue-50 px-1 rounded">• Node.js</div>
                                </>
                              ) : template.category === 'Finance' ? (
                                <>
                                  <div className="text-gray-700 truncate text-[6px] bg-emerald-50 px-1 rounded">• Modélisation</div>
                                  <div className="text-gray-700 truncate text-[6px] bg-emerald-50 px-1 rounded">• Analyse</div>
                                  <div className="text-gray-700 truncate text-[6px] bg-emerald-50 px-1 rounded">• Excel</div>
                                </>
                              ) : template.category === 'Créatif' ? (
                                <>
                                  <div className="text-gray-700 truncate text-[6px] bg-purple-50 px-1 rounded">• Figma</div>
                                  <div className="text-gray-700 truncate text-[6px] bg-purple-50 px-1 rounded">• Design</div>
                                  <div className="text-gray-700 truncate text-[6px] bg-purple-50 px-1 rounded">• Prototyping</div>
                                </>
                              ) : (
                                <>
                                  <div className="text-gray-700 truncate text-[6px] bg-pink-50 px-1 rounded">• Analytics</div>
                                  <div className="text-gray-700 truncate text-[6px] bg-pink-50 px-1 rounded">• SEO/SEM</div>
                                  <div className="text-gray-700 truncate text-[6px] bg-pink-50 px-1 rounded">• Social Media</div>
                                </>
                              )}
                            </div>
                            <div className="space-y-1 overflow-hidden">
                              <div className="text-gray-700 truncate text-[6px] bg-gray-50 px-1 rounded">• Leadership</div>
                              <div className="text-gray-700 truncate text-[6px] bg-gray-50 px-1 rounded">• Gestion</div>
                              <div className="text-gray-700 truncate text-[6px] bg-gray-50 px-1 rounded">• Communication</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Education Section */}
                        <div>
                          <div className="text-[7px] font-semibold text-violet-700 mb-0.5 uppercase tracking-wide border-b border-violet-200 pb-0.5">
                            Formation
                          </div>
                          <div className="text-[6px] text-gray-700 truncate bg-gray-50 px-1 py-0.5 rounded">
                            Master {template.category === 'Technologie' ? 'Informatique' :
                                   template.category === 'Finance' ? 'Finance' :
                                   template.category === 'Créatif' ? 'Design' :
                                   'Marketing Digital'}
                          </div>
                          <div className="text-[6px] text-violet-500 truncate">École Supérieure • 2018</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* ATS Score Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-xs font-bold text-gray-800">{template.atsScore}% ATS</span>
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-violet-600/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                    
                    {/* Hover Preview Button */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="w-full bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl text-xs font-medium hover:bg-white transition-colors flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Aperçu</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 text-lg">{template.name}</h4>
                      <span className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700 rounded-full">
                        {template.category}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    {/* Template Stats */}
                    <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>2.3k</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>1.2k</span>
                        </span>
                      </div>
                      <span className={`font-semibold ${getScoreColor(template.atsScore)}`}>
                        {template.atsScore}% ATS
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-4 rounded-xl text-sm font-medium hover:from-violet-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg">
                        Utiliser ce template
                      </button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                          <Eye className="w-4 h-4" />
                          <span>Aperçu</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                          <Download className="w-4 h-4" />
                          <span>Télécharger</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/30 mb-12">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pourquoi choisir nos templates ?
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-bold text-gray-900 mb-2">Optimisé ATS</h5>
                <p className="text-sm text-gray-600">
                  Tous nos templates sont optimisés pour passer les filtres ATS avec un taux de réussite de 95%+
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-bold text-gray-900 mb-2">IA Intégrée</h5>
                <p className="text-sm text-gray-600">
                  Assistance IA pour optimiser votre contenu et suggestions personnalisées
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-bold text-gray-900 mb-2">Mis à jour régulièrement</h5>
                <p className="text-sm text-gray-600">
                  Amélioration constante basée sur les retours du marché
                </p>
              </div>
            </div>
          </div>
          
          {/* Selected Template Actions */}
          {selectedTemplate && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/30 text-center">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {templates.find(t => t.id === selectedTemplate)?.name}
                </h4>
                <p className="text-gray-600">
                  {templates.find(t => t.id === selectedTemplate)?.description}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => setCreationMode('form')}
                  className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-violet-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Utiliser ce modèle
                </button>
                
                <button className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                  Aperçu complet
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};