import { Search, Compass, Shield, Users, FileText } from "lucide-react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">검색</h1>
        <p className="mt-2 text-muted">
          이벤트, 주장, 행위자, 합의를 통합적으로 검색합니다.
        </p>
      </div>

      <SearchClient />
    </div>
  );
}
