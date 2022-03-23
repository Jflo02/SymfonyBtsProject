<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220323091833 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE infirmier DROP FOREIGN KEY FK_BFEC55B9F372B779');
        $this->addSql('DROP INDEX IDX_BFEC55B9F372B779 ON infirmier');
        $this->addSql('ALTER TABLE infirmier DROP creneau_infirmier_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE infirmier ADD creneau_infirmier_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE infirmier ADD CONSTRAINT FK_BFEC55B9F372B779 FOREIGN KEY (creneau_infirmier_id) REFERENCES creneau_infirmier (id)');
        $this->addSql('CREATE INDEX IDX_BFEC55B9F372B779 ON infirmier (creneau_infirmier_id)');
    }
}
