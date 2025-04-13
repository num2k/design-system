import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import {
  AutoCompleteContainer,
  AutoCompleteInput,
  AutoCompleteDropdown,
  AutoCompleteOption,
  NoResults,
  ErrorText,
  LoadingIndicator,
  ClearButton,
  InputWrapper,
} from "./AutoComplete.styles";

// 로딩 스피너 아이콘
const LoadingIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
  >
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path
      d="M12 2C6.47715 2 2 6.47715 2 12C2 14.5361 3.10267 16.8517 4.85973 18.4999"
      strokeOpacity="0.75"
    />
  </svg>
);

// 클리어 아이콘
const ClearIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6L18 18" />
  </svg>
);

export interface AutoCompleteOption {
  /** 옵션 값 */
  value: string;
  /** 표시 텍스트 */
  label: string;
  /** 추가 데이터 */
  [key: string]: any;
}

export interface AutoCompleteProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "size" | "onSelect"
  > {
  /** 입력 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 옵션 선택 핸들러 */
  onSelect?: (option: AutoCompleteOption) => void;
  /** 자동완성 옵션 배열 */
  options: AutoCompleteOption[];
  /** 최소 입력 길이 */
  minInputLength?: number;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 레이블 */
  label?: React.ReactNode;
  /** 로딩 상태 */
  loading?: boolean;
  /** 입력 크기 */
  size?: "sm" | "md" | "lg";
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 결과 없음 메시지 */
  noResultsMessage?: string;
  /** 드롭다운 최대 높이 */
  maxHeight?: string | number;
  /** 드롭다운 너비 */
  dropdownWidth?: string | number;
  /** 드롭다운 위치 */
  dropdownPosition?: "top" | "bottom";
  /** 값 변경 지연시간 (ms) */
  debounceTime?: number;
  /** 커스텀 필터링 함수 */
  filterFunction?: (
    options: AutoCompleteOption[],
    inputValue: string
  ) => AutoCompleteOption[];
  /** 값 지우기 버튼 표시 여부 */
  clearable?: boolean;
  /** 필터링 비활성화 */
  disableFilter?: boolean;
  /** 드롭다운 항상 열기 */
  alwaysOpen?: boolean;
  /** CSS 클래스 */
  className?: string;
}

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      value = "",
      onChange,
      onSelect,
      options,
      minInputLength = 1,
      errorMessage,
      error = false,
      label,
      loading = false,
      size = "md",
      fullWidth = false,
      noResultsMessage = "결과가 없습니다",
      maxHeight = 300,
      dropdownWidth,
      dropdownPosition = "bottom",
      debounceTime = 300,
      filterFunction,
      clearable = true,
      disableFilter = false,
      alwaysOpen = false,
      className = "",
      disabled = false,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [filteredOptions, setFilteredOptions] = useState<
      AutoCompleteOption[]
    >([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 입력 값에 따라 옵션 필터링
    const filterOptions = useCallback(
      (input: string) => {
        if (disableFilter) return options;

        if (input.length < minInputLength) {
          return [];
        }

        if (filterFunction) {
          return filterFunction(options, input);
        }

        // 기본 필터링
        const lowercaseInput = input.toLowerCase();
        return options.filter(
          (option) =>
            option.label.toLowerCase().includes(lowercaseInput) ||
            option.value.toLowerCase().includes(lowercaseInput)
        );
      },
      [options, minInputLength, disableFilter, filterFunction]
    );

    // 옵션 업데이트
    useEffect(() => {
      setFilteredOptions(filterOptions(inputValue));
    }, [options, inputValue, filterOptions]);

    // 외부에서 value가 변경되는 경우 상태 업데이트
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // 인풋 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(newValue.length >= minInputLength || alwaysOpen);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (onChange) {
          onChange(newValue);
        }
      }, debounceTime);
    };

    // 옵션 선택 핸들러
    const handleOptionSelect = (option: AutoCompleteOption) => {
      setInputValue(option.label);
      setIsOpen(false);
      if (onSelect) {
        onSelect(option);
      }
      if (onChange) {
        onChange(option.label);
      }
    };

    // 키보드 이벤트 처리
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || filteredOptions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleOptionSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    // 포커스, 블러 핸들러
    const handleFocus = () => {
      if (inputValue.length >= minInputLength || alwaysOpen) {
        setIsOpen(true);
      }
    };

    const handleBlur = () => {
      // setTimeout을 사용하여 옵션 클릭이 처리된 후에 드롭다운을 닫음
      setTimeout(() => {
        setIsOpen(false);
      }, 150);
    };

    // 클리어 버튼 핸들러
    const handleClear = () => {
      setInputValue("");
      setIsOpen(false);
      if (onChange) {
        onChange("");
      }
      inputRef.current?.focus();
    };

    // 클릭 이벤트 핸들러
    const handleInputClick = () => {
      if (disabled) return;
      if (inputValue.length >= minInputLength || alwaysOpen) {
        setIsOpen(true);
      }
    };

    // 외부 클릭 감지를 위한 이벤트 리스너
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          event.target instanceof Node &&
          !containerRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <AutoCompleteContainer ref={containerRef} className={className}>
        {label && <label>{label}</label>}

        <InputWrapper>
          <AutoCompleteInput
            ref={(node) => {
              // forwardRef와 내부 ref 모두 설정
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              inputRef.current = node;
            }}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onClick={handleInputClick}
            $size={size}
            $error={error}
            $fullWidth={fullWidth}
            $disabled={disabled}
            disabled={disabled}
            placeholder={placeholder}
            {...rest}
          />

          {loading && (
            <LoadingIndicator>
              <LoadingIcon />
            </LoadingIndicator>
          )}

          {clearable && inputValue && !loading && !disabled && (
            <ClearButton
              type="button"
              onClick={handleClear}
              aria-label="지우기"
            >
              <ClearIcon />
            </ClearButton>
          )}
        </InputWrapper>

        {error && errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <AutoCompleteDropdown
          $isOpen={isOpen && (filteredOptions.length > 0 || alwaysOpen)}
          $maxHeight={maxHeight}
          $width={dropdownWidth}
          $position={dropdownPosition}
          role="listbox"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <AutoCompleteOption
                key={option.value}
                $isHighlighted={index === highlightedIndex}
                $isSelected={option.label === inputValue}
                onClick={() => handleOptionSelect(option)}
                role="option"
                aria-selected={option.label === inputValue}
              >
                {option.label}
              </AutoCompleteOption>
            ))
          ) : (
            <NoResults>{noResultsMessage}</NoResults>
          )}
        </AutoCompleteDropdown>
      </AutoCompleteContainer>
    );
  }
);

AutoComplete.displayName = "AutoComplete";
