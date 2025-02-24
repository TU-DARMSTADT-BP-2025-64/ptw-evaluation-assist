import { MachineElementCategoryViewModel } from '$lib/models/machine-element-category.model';
import { MachineElementCriteriaViewModel } from '$lib/models/machine-element-criteria.model';
import { MachineElementViewModel } from '$lib/models/machine-element.model';
import type { Repository } from './repository';

export function initMachineElementCategories(repository: Repository) {
	const machineElementCategories = [
		'Verbindungselemente',
		'Lagerungselemente',
		'Übertragungselemente',
		'Dichtungselemente',
		'Elemente_zum_Transport_von_Flüssigkeiten_und_Gasen',
		'Bau_und_Gehäuseteile',
		'Elektronisches_Bauteile'
	];

	const machineElementCategoryIdMap = new Map<string, string>();

	machineElementCategories.forEach((category) => {
		const machineElementCategory = new MachineElementCategoryViewModel({ name: category });
		repository.addMachineElementCategory(machineElementCategory);
		machineElementCategoryIdMap.set(category, machineElementCategory.id);
	});

	const machineElementsMap: Record<string, string[]> = {
		Verbindungselemente: [
			'Niete',
			'Schrauben',
			'Federn',
			'Stifte_Bolzen',
			'Schweißverbindungen',
			'Lötverbindungen',
			'Klebverbindungen'
		],
		Lagerungselemente: ['Gleitlager', 'Wälzlager'],
		Übertragungselemente: ['Achsen_Wellen', 'Zahnräder', 'Riemen_und_Kettentriebe'],
		Dichtungselemente: ['Statische_Dichtungen', 'Dynamische_Dichtungen'],
		Elemente_zum_Transport_von_Flüssigkeiten_und_Gasen: ['Rohre', 'Ventile'],
		Bau_und_Gehäuseteile: ['Gehäuse', 'Rahmen', 'Kerne'],
		Elektronisches_Bauteile: ['Platine']
	};

	const machineElementIdMap = new Map<string, string>();

	Object.keys(machineElementsMap).forEach((category: string) => {
		machineElementsMap[category].forEach((element: string) => {
			const machineElement = new MachineElementViewModel({
				machineElementCategoryId: machineElementCategoryIdMap.get(category)!,
				name: element
			});
			repository.addMachineElement(machineElement);
			machineElementIdMap.set(element, machineElement.id);
		});
	});

	const machineElementCriteriaMap: Record<string, string[]> = {
		Niete: ['Verschleiß durch Korrosion ', 'Plastische Verformung', 'Oberflächenzerrüttung'],
		Schrauben: ['Korrosiver Verschleiß', 'Plastische Verformung'],
		Federn: ['Plastische Verformung'],
		Stifte_Bolzen: ['Plastische Verformung', 'Oberflächenzerüttung'],
		Schweißverbindungen: [
			'Korrosiver Verschleiß',
			'Plastische Verformung',
			'Oberflächenzerrüttung'
		],
		Lötverbindungen: ['Korrosiver Verschleiß', 'Plastische Verformung', 'Oberflächenzerrüttung'],
		Klebverbindungen: ['Haftverlust', 'Rissbildung durch Korrosion'],
		Wälzlager: [
			'Pitting durch Adhäsion',
			'Spiel durch Abrasion ',
			'Korrosiver Verschleiß',
			'Oberflächenzerrüttung an Wälzelementen',
			'Plastische Verformung der Wälzlager'
		],
		Gleitlager: [
			'Korrosiver Verschleiß',
			'Pitting durch Adhäsion',
			'Spiel durch Abrasion',
			'Oberflächenzerrüttung an Grenzflächen'
		],
		Achsen_Wellen: [
			'Rissbildung',
			'Biegung durch Plastische Verformung',
			'Riefenbildung druch Abrasion',
			'Verschleiß durch Korrosion'
		],
		Zahnräder: [
			'Zahnflankenausbrüche',
			'Pitting durch Adhäsion',
			'Riefenbildung druch Abrasion',
			'Verschleiß durch Korrosion'
		],
		Riemen_und_Kettentriebe: [
			'Längung durch plastische Verformung',
			'Riefenbildung druch Abrasion',
			'Rissbildung durch Korrosion',
			'Verhärtung durch Korrosion/Veralten'
		],
		Statische_Dichtungen: [
			'Leckage durch plastische Verformung',
			'Rissbildung durch Materialermüdung',
			'Verhärtung durch Korrosion/Veralten'
		],
		Dynamische_Dichtungen: [
			'Leckage durch plastische Verformung',
			'Rissbildung durch Materialermüdung',
			'Verhärtung durch Korrosion/Veralten',
			'Leckage durch Abrieb'
		],
		Rohre: [
			'Leckage durch Materialermüdung',
			'Biegung durch Plastische Verformung',
			'Rissbildung druch plastische Verformung',
			'Verschleiß durch Korrosion'
		],
		Ventile: [
			'Verschleiß durch Korrosion',
			'Materialermüdung',
			'Plastische Verformung',
			'Leckage durch Materialermüdung'
		],
		Gehäuse: ['Abrasion außen', 'Materialermüdung durch Korrosion', 'Plastische Verformung'],
		Rahmen: ['Abrasion außen', 'Materialermüdung durch Korrosion', 'Plastische Verformung'],
		Kerne: ['Abrasion', 'Materialermüdung durch Korrosion', 'Plastische Verformung'],
		Platine: ['Kontaktkorrosion', 'Lötstellenbruch']
	};

	Object.keys(machineElementCriteriaMap).forEach((element) => {
		machineElementCriteriaMap[element].forEach((criterion) => {
			const machineElementCriteria = new MachineElementCriteriaViewModel({
				name: criterion,
				machineElementId: machineElementIdMap.get(element)!
			});
			repository.addMachineElementCriteria(machineElementCriteria);
		});
	});
}
