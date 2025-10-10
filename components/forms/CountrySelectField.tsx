'use client';

import { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from 'react-select-country-list';

type CountryOption = {
    value: string;
    label: string;
};

type CountrySelectProps = {
    value: string;
    onChange: (value: string) => void;
};

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
    const [open, setOpen] = useState(false);
    const countries: CountryOption[] = countryList().getData();

    // Helper to convert ISO country code to flag emoji
    const getFlagEmoji = (countryCode: string) => {
        return countryCode
            .toUpperCase()
            .split('')
            .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
            .join('');
    };

    const selectedCountry = countries.find(c => c.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="country-select-trigger w-full justify-between"
                >
                    {selectedCountry ? (
                        <span className="flex items-center gap-2">
              <span>{getFlagEmoji(selectedCountry.value)}</span>
              <span>{selectedCountry.label}</span>
            </span>
                    ) : (
                        'Select your country...'
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-full p-0 bg-gray-800 border-gray-600"
                align="start"
            >
                <Command className="bg-gray-800 border-gray-600">
                    <CommandInput placeholder="Search countries..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandList className="max-h-60 overflow-y-auto">
                        <CommandGroup>
                            {countries.map(country => (
                                <CommandItem
                                    key={country.value}
                                    value={country.label}
                                    onSelect={() => {
                                        onChange(country.value);
                                        setOpen(false);
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4 text-yellow-500',
                                            value === country.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    <span>{getFlagEmoji(country.value)}</span>
                                    <span>{country.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

type CountrySelectFieldProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
};

export const CountrySelectField = ({
                                       name,
                                       label,
                                       control,
                                       error,
                                       required = false,
                                   }: CountrySelectFieldProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <CountrySelect value={field.value} onChange={field.onChange} />
                )}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
            <p className="text-xs text-gray-500">
                Helps us show market data and news relevant to you.
            </p>
        </div>
    );
};
