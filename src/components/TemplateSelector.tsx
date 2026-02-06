"use client";

import { Template } from "@/types";
import { Check, Zap, Shield } from "lucide-react";

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onSelect: (template: Template) => void;
}

export default function TemplateSelector({
  templates,
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-black text-white drop-shadow-lg flex items-center justify-center gap-2">
        <Zap className="w-7 h-7 text-accent-yellow" />
        PILIH TEMPLATE RANGER
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template, index) => {
          const colors = [
            "from-primary-500 to-primary-600",
            "from-secondary-500 to-secondary-600",
            "from-accent-yellow to-accent-yellow",
            "from-accent-pink to-accent-pink",
            "from-accent-green to-accent-green",
          ];
          const borderColors = [
            "border-primary-500",
            "border-secondary-500",
            "border-accent-yellow",
            "border-accent-pink",
            "border-accent-green",
          ];
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={`relative p-4 rounded-xl border-4 transition-all transform hover:scale-110 shadow-xl ${
                selectedTemplate?.id === template.id
                  ? `${borderColors[index % 5]} bg-gradient-to-br ${colors[index % 5]} shadow-2xl scale-105`
                  : "border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 hover:border-accent-yellow"
              }`}
            >
              <div
                className={`aspect-square bg-gradient-to-br ${colors[index % 5]} rounded-lg mb-2 flex items-center justify-center shadow-lg`}
              >
                <Shield size={56} className="text-white drop-shadow-lg" />
              </div>
              <p className="text-sm font-black text-white drop-shadow-lg">
                {template.name}
              </p>
              {selectedTemplate?.id === template.id && (
                <div className="absolute -top-2 -right-2 bg-accent-yellow rounded-full p-2 animate-bounce border-2 border-white shadow-lg">
                  <Check size={18} className="text-black font-bold" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
